import { ACTIONS } from '../App';

const DigitKey = ({ digit, digitClass, dispatch }) => {
  return (
    <>
      <button
        className={`calculator-keys-grid calculator-keys-grid--${digitClass}`}
        onClick={() => {
          dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } });
        }}
      >
        {`${digit}`}
      </button>
    </>
  );
};

export default DigitKey;
