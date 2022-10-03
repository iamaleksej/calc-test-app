import React, { useState, useEffect, useMemo } from "react";
import { ScalesItem } from "../scales-item";
import { ResultItem } from "../result-item";
import { Button } from "../button";
import { sendData } from "../../services/data-service"
import './app.sass';


const App = () => {

   const percent = 0.035;
   const minScaleValuePriceCar = 1000000
   const maxScaleValuePriceCar = 6000000
   const minScaleValuePercent = 10
   const maxScaleValuePercent = 60
   const minScaleValueLeasingTerm = 1
   const maxScaleValueLeasingTerm = 60
   const [scalePriceCar, setScalePriceCar] = useState(3300000)
   const [scalePercent, setScalePercent] = useState(13)
   const [scaleFirstFee, setScaleFirstFee] = useState((scalePriceCar / 100 * scalePercent))
   const [scaleLeasingTerm, setScaleLeasingTerm] = useState(60)
   const [resultLeasing, setResultLeasing] = useState('')
   const [resultPayment, setResultPayment] = useState('')
   const [disabledBtn, setDisabledBtn] = useState(false)
   const [loader, setLoader] = useState(false)
   const [helpCar, setHelpCar] = useState(false)
   const [helpPercent, setHelpPercent] = useState(false)
   const [helpLeasingTerm, setHelpLeasingTerm] = useState(false)
   const [disabled, setDisabled] = useState(false)

   // функция handleChangeValueScale для события onChange, проверка в ней 
   //происходит для отображения подсказки(диапозон вводимых чисел), 
   //а также сразу заменяется число на максимальное значение, если вводимое число больше максимального. 
   //Для замены на минимального - функция checkMinValue
   const handleChangeValueScale = (e, minValue, maxValue, setState, setHelp) => {
      let value = e.target.value;

      if (value < minValue) {
         setHelp(true)
         setState(value)
      }
      else if (value > maxValue) {
         setHelp(false)
         setState(maxValue)
      }
      else {
         setHelp(false)
         setState(value)
      }
   }

   //функция checkMinValue на событие onBlur, 
   //потому что если делать замену числа вне диапазона на минимальное, 
   //то у пользователя не получится ввести значения, удаляя числа
   const checkMinValue = (minValue, state, setState) => {
      if (state <= minValue) {
         return setState(minValue)
      }
      else return state
   }

   useEffect(() => {
      setScaleFirstFee(Math
         .round(scalePriceCar / 100 * scalePercent))
      setResultLeasing(Math
         .round(scaleFirstFee + scaleLeasingTerm * resultPayment))
      setResultPayment(Math
         .round((scalePriceCar - scaleFirstFee) * ((percent * Math.pow((1 + percent), scaleLeasingTerm)) / (Math.pow((1 + percent), scaleLeasingTerm) - 1))
         ))
   }, [scalePriceCar, scalePercent, scaleFirstFee, scaleLeasingTerm, resultPayment])

   //при отправки данных формы сделал несколько секунд задержи, 
   //чтобы продемонстрировать все состояния кнопки (loading,disabled)
   const submit = event => {
      event.preventDefault();
      const form = document.querySelector('.form');
      let data = {};
      const formData = new FormData(form);

      formData.forEach((value, key) => data[key] = value);
      setLoader(true)
      setDisabledBtn(true)
      setDisabled(true)

      setTimeout(async () => {
         await sendData(data)
         setLoader(false)
         setDisabledBtn(false)
         setDisabled(false)
      }, 2000)
   };


   const visibleHelpTitle = (helpState, helpTitle) => helpState ? helpTitle : ''
   const memoizedHelpCar = useMemo(() => visibleHelpTitle(helpCar, 'Введите число от 1 до 6 млн'), [helpCar])
   const memoizedHelpPercent = useMemo(() => visibleHelpTitle(helpPercent, 'Введите число от 10 до 60 %'), [helpPercent])
   const memoizedHelpLeasingTerm = useMemo(() => visibleHelpTitle(helpLeasingTerm, 'Введите число от 1 до 60 мес.'), [helpLeasingTerm])

   return (
      <form className="form" onSubmit={submit}>
         <h1 className="title">Рассчитайте стоимость автомобиля в лизинг</h1>
         <div className="scales">
            <ScalesItem titleScales={'Стоимость автомобиля'}
               valueScale={scalePriceCar}
               minScaleValue={minScaleValuePriceCar}
               maxScaleValue={maxScaleValuePriceCar}
               unitScale='₽'
               name='price_car'
               disabled={disabled}
               memoizedHelp={memoizedHelpCar}
               handleChangeValueScale={(e) => handleChangeValueScale(e, minScaleValuePriceCar, maxScaleValuePriceCar, setScalePriceCar, setHelpCar)}
               checkMinValue={() => checkMinValue(minScaleValuePriceCar, maxScaleValuePriceCar, scalePriceCar, setScalePriceCar)} />
            <ScalesItem titleScales={'Первоначальный взнос'}
               valueScale={scaleFirstFee}
               visiblePercent='true'
               minScaleValue={minScaleValuePercent}
               maxScaleValue={maxScaleValuePercent}
               valuePercent={scalePercent}
               name='first_fee'
               disabled={disabled}
               memoizedHelp={memoizedHelpPercent}
               handleChangeValueScalePercent={(e) => handleChangeValueScale(e, minScaleValuePercent, maxScaleValuePercent, setScalePercent, setHelpPercent)}
               handleChangeValueScale={(e) => handleChangeValueScale(e, null, null, setScaleFirstFee, null)}
               checkMinValue={() => checkMinValue(minScaleValuePercent, maxScaleValuePercent, scalePercent, setScalePercent)} />
            <ScalesItem titleScales={'Срок лизинга'}
               valueScale={scaleLeasingTerm}
               minScaleValue={minScaleValueLeasingTerm}
               maxScaleValue={maxScaleValueLeasingTerm}
               name='leasing_term'
               disabled={disabled}
               memoizedHelp={memoizedHelpLeasingTerm}
               handleChangeValueScale={(e) => handleChangeValueScale(e, minScaleValueLeasingTerm, maxScaleValueLeasingTerm, setScaleLeasingTerm, setHelpLeasingTerm)}
               checkMinValue={() => checkMinValue(minScaleValueLeasingTerm, maxScaleValueLeasingTerm, scaleLeasingTerm, setScaleLeasingTerm)}
               unitScale='мес.' />
         </div>
         <div className="result-btn">
            <div className="result">
               <ResultItem titleResult={'Сумма договора лизинга'}
                  valueResult={resultLeasing}
                  name='result_leasing'
                  disabled={disabled}
               />
               <ResultItem titleResult={'Ежемесячный платеж от'}
                  valueResult={resultPayment}
                  name='payment'
                  disabled={disabled}
               />
            </div>
            <div className="btn-wrapper">
               <Button titleBtn={'Оформить заявку'}
                  disabled={disabledBtn}
                  loader={loader} />
            </div>
         </div>
      </form>
   )
}

export default App;