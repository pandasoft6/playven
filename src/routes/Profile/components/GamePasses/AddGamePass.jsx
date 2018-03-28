import React  from 'react'

const AddGamePass = ({ addGamePass }) =>
  <div className="add-game-pass">
    <div className="add-game-pass__title-block">
      <div className="add-game-pass__title">Add game pass</div>
      <div className="add-game-pass__sub-title">Got a promo? Add it right away</div>
    </div>
    <div className="add-game-pass__input-block">
      <div>
        <input placeholder="Promocode or title" type="text" />
      </div>
      <div>
        <button>Confirm</button>
      </div>
    </div>
  </div>

export default AddGamePass
