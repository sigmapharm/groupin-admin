import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

// images

import slideImg1 from '../../images/img_1.png';
import slideImg2 from '../../images/img_2.png';
import slideImg3 from '../../images/img_3.png';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const imgSteps = [slideImg1, slideImg2, slideImg3];

const styles = theme => ({
  root: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  img: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    maxHeight: '380px',
    borderRadius: 10,
  },
});

class SwipeableTextMobileStepper extends React.Component {
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = imgSteps.length;

    return (
      <div className={classes.root}>
        <div>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents
          >
            {imgSteps.map((step, index) => (
              <div key={index}>
                {Math.abs(activeStep - index) <= 2 ? <img className={classes.img} src={step} alt="login slide img" /> : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            className={classes.mobileStepper}
            nextButton={
              <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              </Button>
            }
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SwipeableTextMobileStepper);
