import React, {useContext} from 'react';
import {Context} from '../index';
import {observer} from "mobx-react-lite";
import LazyImage from "./LazyImage";
import Slider from "./Slider";
const Block = observer((data,v) => {
    const {inface} = useContext(Context)
    data = data.data
    //<LazyImage onClick={()=>{inface.setCurrProduct(data);document.getElementById('theOnlyOneBody').style.overflow = 'hidden';}} style={{objectFit:'contain',width:'100%',maxHeight:inface.mobile ? '160px' : '280px',maxWidth:'100%'}} src={process.env.REACT_APP_API_URL + JSON.parse(data.obj || "{}").background} alt=''/>


    return(<div style={{display:'grid',minHeight:'100%',cursor:'default',borderRadius:'10px',overflow:'hidden',maxWidth:'calc(' + (inface.width / 2) + 'px - 1em',boxShadow:'0 3px 5px 0 rgb(0 0 0 / 8%)',position:'relative'}}>
        <div id={'slider_wrapper'+data.id} style={{height:inface.mobile ? '200px' : '300px',maxWidth:'100%',position:'relative',display:'grid'}}>
            <Slider data={data}/>
        </div>
        <div style={inface.mobile ? {padding:'25px 1em 45px 1em',} : {padding:'50px 1em 60px 1em'}}>
            <h4 onClick={()=>{inface.setCurrProduct(data);document.getElementById('theOnlyOneBody').style.overflow = 'hidden';}}>{JSON.parse(data.obj || "{}").title}</h4>
            <div onClick={()=>{inface.setCurrProduct(data);document.getElementById('theOnlyOneBody').style.overflow = 'hidden';}} style={{fontSize:'0.95em',marginTop:'7px',display:'-webkit-box',WebkitLineClamp:'3',WebkitBoxOrient:'vertical',overflow:'hidden'}}><div  dangerouslySetInnerHTML={{__html:JSON.parse(data.obj || '{}').text || ''}}/></div>
        </div>
        {JSON.parse(data.obj || "{}").price && JSON.parse(data.obj || "{}").price.length > 0 &&<div onClick={()=>{inface.setCurrProduct(data);document.getElementById('theOnlyOneBody').style.overflow = 'hidden';}} style={{position:'absolute',left:'1em',bottom:'1.5em',}}><b style={{fontSize:"1.25em"}}>{JSON.parse(data.obj || "{}").price.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ')}</b> руб.</div>}
        {inface.basket.includes(data.id)?
        <div style={inface.mobile ? {padding:'2px',position:'absolute',right:'0em',width:'95px',bottom:'1em',} : {padding:'12px',position:'absolute',right:'0em',bottom:'0em',}} className='noselect'>
            <div onClick={()=>{let arr = inface.basket;arr.push(data.id);inface.setBasket(arr)}} style={{float:'right',cursor:'pointer',padding:inface.mobile ? '12px 6px 12px 6px' : '17px 10px 20px 10px',fontWeight:'bold',fontSize:'1.8em',lineHeight:'0',borderRadius:'50%',boxShadow:'0 1px 14px 1px rgb(0 0 0 / 10%)',display:'inline-block',background:'#c4c4c4'}}>+</div>
            <div style={inface.mobile ? {float:'right',margin:'0 4px',paddingTop:'4px'} : {float:'right',fontSize:'1.6em',margin:'0 20px'}}>{inface.basket.filter(d=>d === data.id).length} шт.</div>
            <div onClick={()=>{let arr = inface.basket;arr.splice(arr.indexOf(data.id),1);inface.setBasket(arr)}} style={{float:'right',cursor:'pointer',padding:inface.mobile ? '12px 9px 12px 9px' : '16px 14px 21px 14px',fontWeight:'bold',fontSize:'1.8em',lineHeight:'1px',borderRadius:'50%',boxShadow:'0 1px 14px 1px rgb(0 0 0 / 10%)',display:'inline-block',background:'#c4c4c4'}}>-</div>
        </div>:
        <div onClick={()=>{let arr = inface.basket;arr.push(data.id);inface.setBasket(arr)}} style={{padding:'12px',position:'absolute',right:'1em',bottom:'0.5em',borderRadius:'50%',background:'#022978',display:'grid',placeItems:'center',cursor:'pointer'}}><svg style={{stroke:'#022978',fill:'white',width:'1.5em',height:'1.5em',}} viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg"><use xlinkHref='#plusSVG' ></use></svg></div>}
    </div>)
});
export default Block;