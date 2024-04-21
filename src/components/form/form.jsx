import React from "react";

import Styles from './form.module.css'
const Form = ({ slide, handelchange, slideIndex,constCategory }) => {

  return (
    <div className={Styles.innerFormcontainer}>
      <div  className={Styles.inputChip} >
        <label htmlFor="heading">Heading:</label>
        <input
          name="heading"
          type="text"
          value={slide.heading}
          onChange={(e) => handelchange(e, slideIndex)}
          placeholder="heading"
        />
      </div>
      <div className={Styles.inputChip}>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          type="text"
          value={slide.description}
          onChange={(e) => handelchange(e, slideIndex)}
          placeholder="description"
        />
      </div>
      <div className={Styles.inputChip}>
        <label htmlFor="imageUrl">imageUrl:</label>
        <input
          name="imageUrl"
          type="text"
          value={slide.imageUrl}
          onChange={(e) => handelchange(e, slideIndex)}
          placeholder="imageUrl"
        />
      </div>
      <div className={Styles.inputChip}> 
        <label>Category : </label>
        <select
          name="category"
          onChange={(e) => handelchange(e, slideIndex)}
          value={slide.category}
        >
          <option value="" style={{ color: "#847c7c" }}>
            Select Category
          </option>
          {constCategory.map((category) => (
            <option key={category + slideIndex} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;

