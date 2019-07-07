import React from 'react';
import { createStructuredSelector } from 'reselect';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators, compose } from 'redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Step from '@material-ui/core/Step/Step';
import Stepper from '@material-ui/core/Stepper/Stepper';
import history from 'utils/history';
import Paper from '@material-ui/core/Paper/Paper';
import styles from './style';
import authenticated from '../HOC/authenticated/authenticated';
import CommandChooser from './components/commands';
import ArticlesAggregation from './components/articles';
import ProviderChooser from './components/provider';

import * as actionCreators from './store/actions.creators';
import { getAllArticlesByCommands, getAllCommands } from './store/selectors';

function getSteps() {
  return [
    'Choisir les commands',
    'Modifier les quantité',
    'Choisir un fourniseur',
  ];
}

class Grouping extends React.PureComponent {
  state = {
    activeStep: 0,
    selectedProvider: null,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    const { loadAggregatedArticles, commands } = this.props;
    if (activeStep === 0)
      loadAggregatedArticles(
        commands
          .filter(({ selected }) => !!selected)
          .map(({ commandId }) => commandId),
      );
    if (activeStep === 2) {
      this.submitCommandAggregate();
      return;
    }
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  submitCommandAggregate() {
    const {
      articles,
      commands,
      match: {
        params: { offerId },
      },
      createCommandAggregate,
    } = this.props;
    const { selectedProvider } = this.state;
    createCommandAggregate(
      {
        providerId: selectedProvider.value,
        offerId,
        commandsId: commands
          .filter(({ selected }) => !!selected)
          .map(({ commandId }) => commandId),
        commandArticleAggregates: articles,
      },
      () => {
        history.push('/commands');
      },
    );
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  onCommandSelectionChange = payload => {
    const { changeCommandSelection } = this.props;
    changeCommandSelection(payload);
  };

  onArticleQuantityChange = payload => {
    const { changeAggregatedArticleQuantity } = this.props;
    changeAggregatedArticleQuantity(payload);
  };

  componentWillMount() {
    const {
      match: {
        params: { offerId },
      },
      loadAllCommandByOffer,
    } = this.props;
    loadAllCommandByOffer(offerId);
  }

  componentWillUnmount() {
    const { clearGroupingResources } = this.props;
    clearGroupingResources();
  }

  get activeNextStep() {
    const { activeStep, selectedProvider } = this.state;
    const { articles, commands } = this.props;
    if (activeStep === 0)
      return commands.length && _.some(commands, ({ selected }) => !!selected);
    if (activeStep === 1) return articles.length;
    if (activeStep === 2) {
      return !!selectedProvider;
    }
    return false;
  }

  render() {
    const { classes, commands, articles } = this.props;
    const steps = getSteps();
    const { activeStep, selectedProvider } = this.state;

    return (
      <Paper className={classes.root}>
        <Stepper className={classes.stepperContainer} activeStep={activeStep}>
          {steps.map(label => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === 0 && (
            <CommandChooser
              commands={commands}
              onChange={this.onCommandSelectionChange}
            />
          )}
          {activeStep === 1 && (
            <ArticlesAggregation
              articles={articles || []}
              onChange={this.onArticleQuantityChange}
            />
          )}
          {activeStep === 2 && (
            <ProviderChooser
              value={selectedProvider}
              onChange={selectedProvider => this.setState({ selectedProvider })}
            />
          )}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Button
              disabled={activeStep === 0}
              onClick={this.handleBack}
              className={classes.button}
            >
              Précedent
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.activeNextStep}
              onClick={this.handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1
                ? 'Créer la command'
                : 'Ėtape Suivante'}
            </Button>
          </div>
        </div>
      </Paper>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch);

const mapStateToProps = createStructuredSelector({
  commands: getAllCommands(),
  articles: getAllArticlesByCommands(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  authenticated,
  withConnect,
  withStyles(styles),
)(Grouping);
