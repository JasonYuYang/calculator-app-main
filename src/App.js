import { useReducer } from 'react';
import DigitKey from './components/DigitKey';
import OperatorKey from './components/OperatorKey';
import Header from './layout/Header/Header';
import './_app.scss';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

function evaluate({ currentOutput, previousOutput, operation }) {
  const prev = parseFloat(previousOutput);
  const current = parseFloat(currentOutput);
  if (isNaN(prev) || isNaN(current)) return '';
  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case 'x':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split('.');
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const calculatorReducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.ADD_DIGIT:
        if (payload.digit === '0' && state.currentOutput === '0') {
          return state;
        }
        if (payload.digit === '.' && state.currentOutput.includes('.')) {
          return state;
        }
        return {
          ...state,
          currentOutput: `${state.currentOutput || ''}${payload.digit}`,
        };
      case ACTIONS.CHOOSE_OPERATION:
        if (state.currentOutput == null && state.previousOutput == null) {
          return state;
        }

        if (state.currentOutput == null) {
          return {
            ...state,
            operation: payload.operation,
          };
        }

        if (state.previousOutput == null) {
          return {
            ...state,
            operation: payload.operation,
            previousOutput: state.currentOutput,
            currentOutput: null,
          };
        }

        return {
          ...state,
          previousOutput: evaluate(state),
          operation: payload.operation,
          currentOutput: null,
        };
      case ACTIONS.CLEAR:
        return {};
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOutput: null,
          };
        }
        if (state.currentOutput == null) return state;
        if (state.currentOutput.length === 1) {
          return { ...state, currentOutput: null };
        }

        return {
          ...state,
          currentOutput: state.currentOutput.slice(0, -1),
        };
      case ACTIONS.EVALUATE:
        if (
          state.operation == null ||
          state.currentOutput == null ||
          state.previousOutput == null
        ) {
          return state;
        }

        return {
          ...state,
          overwrite: true,
          previousOutput: null,
          operation: null,
          currentOutput: evaluate(state),
        };
      default:
    }

    return {
      ...state,
      overwrite: true,
      previousOutput: null,
      operation: null,
      currentOutput: evaluate(state),
    };
  };

  const [{ currentOutput, previousOutput, operation }, dispatch] = useReducer(
    calculatorReducer,
    {}
  );
  return (
    <main className='calculator-container'>
      <Header></Header>
      <div className='calculator-output-screen'>
        <span className='calculator-output-previous-operand'>
          {formatOperand(previousOutput)}
          {operation}
        </span>
        <span className='calculator-output-current-operand'>{formatOperand(currentOutput)}</span>
      </div>
      <div className='calculator-keys-grid-group'>
        {' '}
        <DigitKey dispatch={dispatch} digitClass={'7'} digit={7} />
        <DigitKey dispatch={dispatch} digitClass={'8'} digit={8} />
        <DigitKey dispatch={dispatch} digitClass={'9'} digit={9} />
        <div
          className='calculator-keys-grid calculator-keys-grid--del'
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </div>
        <DigitKey dispatch={dispatch} digitClass={'4'} digit={4} />
        <DigitKey dispatch={dispatch} digitClass={'5'} digit={5} />
        <DigitKey dispatch={dispatch} digitClass={'6'} digit={6} />
        <OperatorKey dispatch={dispatch} operationClass={'add'} operation={'+'} />
        <DigitKey dispatch={dispatch} digitClass={'1'} digit={1} />
        <DigitKey dispatch={dispatch} digitClass={'2'} digit={2} />
        <DigitKey dispatch={dispatch} digitClass={'3'} digit={3} />
        <OperatorKey dispatch={dispatch} operationClass={'sub'} operation={'-'} />
        <DigitKey dispatch={dispatch} digitClass={'point'} digit={'.'} />
        <DigitKey dispatch={dispatch} digitClass={'0'} digit={0} />
        <OperatorKey dispatch={dispatch} operationClass={'div'} operation={'/'} />
        <OperatorKey dispatch={dispatch} operationClass={'mul'} operation={'x'} />
        <div
          className='calculator-keys-grid calculator-keys-grid--reset'
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          RESET
        </div>
        <div
          className='calculator-keys-grid calculator-keys-grid--equal'
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </div>
      </div>
    </main>
  );
}

export default App;
