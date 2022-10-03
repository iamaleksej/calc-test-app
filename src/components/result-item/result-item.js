import React from 'react';
import './result-item.sass';

const ResultItem = ({ titleResult, valueResult, name }) => {

   if (isNaN(valueResult) || valueResult === Infinity) {
      valueResult = 0
   }

   return (
      <div className="result__item" >
         <h2 className="result__title">{titleResult}</h2>
         <div className="result__value_wrap">
            <input className="result__input"
               value={new Intl.NumberFormat("ru-RU").format(valueResult)}
               name={name}
               type='text'
               readOnly={true}
               autoComplete="off"
            />
            <label className="result__value">
               {valueResult ? `${new Intl.NumberFormat("ru-RU").format(valueResult)}` : 0}
               <p className="result__unit">{`₽`}</p>
            </label>
         </div>
      </div>
   )
}

export default ResultItem;
