import { ACTIONS } from '../App';

function OperatorKey({ operationClass, operation, dispatch }) {
  return (
    <>
      <button
        className={`calculator-keys-grid calculator-keys-grid--${operationClass}`}
        onClick={() => {
          dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
        }}
      >
        {`${operation}`}
      </button>
    </>
  );
}

export default OperatorKey;
