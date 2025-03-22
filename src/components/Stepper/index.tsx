import React from 'react';
import './Stepper.scss';

type IStepOption = {
  id: number;
  head: string;
  headDescription?: string;
  status?: {
    statusImg: any;
    statusCode: string;
  };
}

interface IStepHeaderType {
  activeStep: number;
  setActiveStep: (step: number) => void;
  steps: IStepOption[];
}

const StepHeader: React.FC<IStepHeaderType> = ({ activeStep, steps}) => {

  return (
    <div className="stepper">
      <div className="divider" />
      <ul>
        {steps.map((step, index) => (
          <li key={step.id}>
            <div className="dot-wrapper" />
            <div className="stepper-wrapper">
              <div className="stepper-content-wrapper">
                <span className="step-header">
                  {step.head}
                </span>
                <span className="step-description">
                  {step.headDescription}
                </span>
              </div>
              {(index + 1 <= activeStep && index + 1 < activeStep) ? (
                <div>
                  {/*<ApprovedTickSVG  />*/}
                </div>
              ) : (
                <span className={`step-number ${index + 1 <= activeStep ? 'active-number' : ''} 
                  ${index + 1 < activeStep ? 'active-number' : ''}`}>
                  {step.id}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepHeader;
