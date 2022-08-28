import {React, useState} from "react";
import "./blockname.css";


function Searchinput(props) {
    return (
        <div className="searchinput">
            <input id="searchinput"  placeholder="Search for a name..." onKeyUp={()=>{
                let textsearch = document.getElementById("searchinput").value;
                props.selectNames(textsearch);
            }}></input>
        </div>
    )
}

function Favorites(props){
    return (
        <div className="favorites" id="favorites">
            <span >Favorites: </span>
            {props.list.map(e => <Blockname key={e.id} persondata = {e} onclickfunct={props.changeFavfunc}/>)}
        </div>
    )
}
function Blockname(props) {
    
    let blocknamestyle = props.persondata["sex"] === 'm'? "malestyle" : "femalestyle";
    return (
        <span className={blocknamestyle} onClick={()=>{props.onclickfunct(props.persondata)}}>
            {props.persondata.name}
        </span>
    )
}

function sortListByName(list) {
    let sortedList = list.map(e => e.name + e.id).sort();
    let ans = [];
    sortedList.forEach((e) => {ans.push(list.filter(a => (a.name + a.id === e))[0])
    })
    return ans;
  }

function Allnames(props) {
    let sortednames = sortListByName(props.data);
    //let sortednames =props.data;
    return (
        <div className="allnamesblock" id="table">
            {sortednames.map(e => <Blockname persondata = {e} onclickfunct={props.changeFavfunc}/>)}
        </div>
    )
}

function ChooseFemail(props){
    return (
        <form onChange={()=>{
            let choises = document.getElementsByName("contact");
            for (let choise of choises) {
                if (choise.checked) props.selectfunc(choise.value)
            }
            
        }}>
            <input type="radio" id="contactChoice1"
            name="contact" value=""/>
            <label for="contactChoice1">All</label>

            <input type="radio" id="contactChoice2"
            name="contact" value="m"/>
            <label for="contactChoice2">Male</label>

            <input type="radio" id="contactChoice3"
            name="contact" value="f"/>
            <label for="contactChoice3">Female</label>            
        </form>
    )
}

function Container(props) {
    const [favoritesNames, setFavoritesNames] = useState([]);
    const [searchList, setSearchList] = useState(props.data);
    function changeFav(data){
        if (!favoritesNames.includes(data)) {setFavoritesNames(favoritesNames.concat(data))}
    }
    function deleteFromFav(data){
        setFavoritesNames(favoritesNames.filter(e => e!==data));
    }
    function selectNames(str){
        setSearchList(props.data.filter(e => e.name.toLowerCase().includes(str.toLowerCase())))
    }
    function selectSex(str){
        setSearchList(props.data.filter(e => e.sex.includes(str)))
    }
    return (
        <div className="allblock" > 
        <Searchinput selectNames={selectNames}/>
        <ChooseFemail selectfunc={selectSex}/>
        <Favorites list={favoritesNames} changeFavfunc={deleteFromFav}/>
        <Allnames data={searchList} changeFavfunc={changeFav} />
        </div>
    )
}

export default Container;