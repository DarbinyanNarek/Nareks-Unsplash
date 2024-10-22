import React, {useEffect, useState} from 'react';
import whiteCheckButton from "../../assets/icons/check-mark.png"
import blackCheckButton from "../../assets/icons/free-icon-check-mark-8001506.png"
import useQuery from "../../utills/hooks/useQuery";

const ColorsBlock = ({setPage, currentColorArray, setCurrentColorArray, searchRequest}) => {
  const [colorArray, setColorArray] = useState([{color: "black_and_white", isActive: false},
    {color: "white", isActive: false}, {
      color: "black", isActive: false
    }, {color: "yellow", isActive: false}, {color: "orange", isActive: false}, {
      color: "red", isActive: false
    }, {color: "purple", isActive: false}, {color: 'magenta', isActive: false}, {color: "green", isActive: false}])
  const {query, setQuery} = useQuery();
  useEffect(() => {
    searchRequest()
  }, [currentColorArray]);

  function findColor(color) {

    const isCurrentlyActive = colorArray.find(c => c.color === color.color)?.isActive;
    const updatedColorArray = colorArray.map(c => ({
      ...c, isActive: c.color === color.color ? !isCurrentlyActive : false
    }));
    setColorArray(updatedColorArray);

    setColorArray(updatedColorArray);
    setCurrentColorArray(prevColors => {
      if (isCurrentlyActive) {
        setQuery(prev => ({...prev, color: query.color.color || " "}));
        setPage(1);
        return prevColors.filter(c => c !== color.color);
      } else {
        setQuery({...query, color: color.color || " "});
        setPage(1);
        return [color.color];
      }
    });
  }


  return (<div className="color_container">
    {colorArray.map((color) => (<div key={color.color}
                                     className="color_item"
                                     style={color.color !== "black_and_white" ? (color.color !== "white" ? {backgroundColor: color.color} : {
                                       backgroundColor: color.color,
                                       borderWidth: "1px",
                                       borderStyle: "solid",
                                       borderColor: "black"
                                     }) : {
                                       borderWidth: "1px",
                                       borderStyle: "solid",
                                       borderColor: "black",
                                       backgroundImage: "linear-gradient(to right, white 50%, black 50%)"
                                     }} onClick={() => findColor(color)}>          {color.isActive &&
      <img className="color_icon"
           src={color.color === "black" ? whiteCheckButton : blackCheckButton}
           alt="white_photo"
      />}
    </div>))}    </div>);
};
export default ColorsBlock;
