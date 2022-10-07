import React from 'react';
import './scales-item.sass'

const ScalesItem = ({
   titleScales, valueScale, handleChangeValueScale,
   minScaleValue, maxScaleValue, visiblePercent,
   unitScale, valuePercent, handleChangeValueScalePercent,
   checkMinValue, name, memoizedHelp, disabled }) => {

   const handleKeyPress = event => {
      const neededKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      if (neededKey.indexOf(event.key) === -1) {
         event.preventDefault()
      }
   }

   const noSpaceNumber = e => e.target.value = e.target.value.replace(/\s/g, '')

   const onChangeWrap = (e) => {
      noSpaceNumber(e)
      handleChangeValueScale(e)
   }
   let width_filling = ((visiblePercent ? valuePercent : valueScale) - minScaleValue) * 100 / (maxScaleValue - minScaleValue)

   const checkWidthForRange = () => {

      if (!visiblePercent) {
         if (valueScale <= minScaleValue) return width_filling = 0;
         else if (valueScale >= maxScaleValue) return width_filling = 100
         else return width_filling
      }
      else {
         if (valuePercent <= minScaleValue) return width_filling = 0;
         else if (valuePercent >= maxScaleValue) return width_filling = 100
         else return width_filling
      }
   }
   checkWidthForRange();

   const style_filling = { width: `${width_filling}%` }

   const inputScaleValue = (
      <input className={visiblePercent ? 'scale__value scale__value_unvisible' : 'scale__value scale__value_visible'}
         type="text"
         value={new Intl.NumberFormat("ru-RU").format(valueScale)}
         name={name}
         min={visiblePercent ? null : minScaleValue}
         max={visiblePercent ? null : maxScaleValue}
         onChange={(e) => onChangeWrap(e)}
         onKeyPress={handleKeyPress}
         onMouseOut={checkMinValue}
         readOnly={visiblePercent ? true : false}
         autoComplete="off"
         disabled={disabled}
      />
   )

   const labelScaleUnit = (
      <label className="scale__value_with-ruble">{`${new Intl.NumberFormat("ru-RU").format(valueScale)}`}
         <span className="scale__unit_with-ruble">{`₽`}</span>
      </label>
   )


   return (
      <div className="scales__item">
         <h2 className="scales__title">{titleScales}</h2>
         <p className="scales__help">
            {memoizedHelp}
         </p>
         <div className="scale">
            <div className="scale__item">
               <div className="scale__value_wrap">
                  {inputScaleValue}
                  {visiblePercent ? labelScaleUnit : null}
               </div>
               {visiblePercent ? (
                  <label className="scale__unit_wrap">
                     <input className="scale__unit percent"
                        type="text"
                        value={new Intl.NumberFormat("ru-RU").format(valuePercent)}
                        name={visiblePercent ? null : name}
                        onChange={handleChangeValueScalePercent}
                        min={minScaleValue}
                        max={maxScaleValue}
                        onKeyPress={handleKeyPress}
                        onMouseOut={checkMinValue}
                        autoComplete="off"
                        disabled={disabled}

                     />
                     %
                  </label>
               ) : null}
               <div className="scale__unit">{unitScale}</div>
            </div>
            <div className="scale-move">
               <input className="scale-move__range"
                  type="range"
                  min={minScaleValue}
                  max={maxScaleValue}
                  value={visiblePercent ? new Intl.NumberFormat("ru-RU").format(valuePercent).replace(/\s/g, '') : new Intl.NumberFormat("ru-RU").format(valueScale).replace(/\s/g, '')}
                  onChange={visiblePercent ? handleChangeValueScalePercent : handleChangeValueScale}
                  step="1"
                  onKeyPress={handleKeyPress}
                  onMouseOut={checkMinValue}
                  disabled={disabled}

               />
               <div className="scale-move__filling" style={style_filling}></div>
            </div>
         </div>
      </div>
   )
}

export default ScalesItem;
