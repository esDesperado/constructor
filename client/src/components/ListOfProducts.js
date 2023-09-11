import React, {useContext,useState,useEffect} from 'react';
import {Context} from '../index';
import {observer} from "mobx-react-lite";
import Distrib from "./Distrib"
import {ADMIN_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
const Block = observer((data,v) => {
    const {inface} = useContext(Context);
    data = data.data;
    let [category,setCategory] = useState("");
    let [categories,setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        let arr2 = []
        inface.blocks.map(d=>{
            if(d.type === 'Товар' && JSON.parse(d.obj || "{}").category && !arr2.includes(JSON.parse(d.obj || "{}").category)){
                arr2.push(JSON.parse(d.obj || "{}").category)
            }
            return true
        })
        arr2 = arr2.slice().sort();
        let clearPath = decodeURI(document.location.pathname).replace(ADMIN_ROUTE,'').replace('/','');
        let page1;

        if (arr2.includes(clearPath) && (clearPath !== category || clearPath !== inface.category)) {
            inface.setCategory(clearPath)
            setCategory(clearPath)
        } else {
            if(!inface.category.length){inface.setCategory(arr2[0])}
            if(!category.length){setCategory(arr2[0])}
        }

        if(JSON.stringify(arr2) !== JSON.stringify(categories)){setCategories(arr2)}
    },[JSON.stringify(inface.blocks),categories,category.length,inface,document.location.pathname])

    useEffect(()=>{
        if (inface.category !== category) {
            setCategory(inface.category);
        }
    },[inface.category])
    return(
    <div style={inface.mobile ? {} : {display:'grid',gridTemplateColumns: '1fr 3fr',gridGap:'1em'}}>
        {!inface.mobile && <div className='noselect' style={{background:'#F7F7F7',borderRadius:'7px',padding:'1em',alignSelf:'start'}}>
            {categories.map((d,key)=>
            <div key={'cat'+d} style={{boxShadow:(category === "" && key === 0) || category === d?'0 1px 6px 2px rgb(0 0 0 / 6%)':'none',background:(category === "" && key === 0) || category === d?'white':'transparent',fontWeight:(category === "" && key === 0) || category === d?'600':'400',borderRadius:'10px',padding:'0.5em 1em',cursor:'pointer'}} onClick={()=>{
                if (document.location.pathname.includes(ADMIN_ROUTE)) {
                    navigate('/'+encodeURI(d)+ADMIN_ROUTE);
                } else {
                    navigate('/'+encodeURI(d));
                }
                //inface.setCategory(d);setCategory(d)
            }}>{d}</div>
            )}
        </div>}
        <div style={{display:'grid',gridAutoFlow:'row',}}>
            {inface.mobile ?
                <div style={{background:'#f5f5f5',position:'sticky',top:'0',zIndex:'3'}}>
                    <div style={{padding:'5px 10px',display:'grid',gridAutoFlow:'column'}}>
                        <svg onClick={()=>{
                            document.getElementById('theOnlyOneBody').style.overflowY = 'hidden';
                            document.getElementById('mobile_categories_list').style.display = 'grid';
                        }} style={{width:'30px',height:'30px',cursor:'pointer',overflow:'hidden',marginRight:'5px',}} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><use xlinkHref='#list' ></use></svg>
                        <div style={{display:'grid',gridAutoFlow:'column',padding:'0'}} className="x-scroll">
                            {categories.map((d,key)=>
                                <div key={'cat'+d} style={{whiteSpace:'nowrap',background:(category === "" && key === 0) || category === d?'white':'transparent',fontWeight:'600',borderRadius:'10px',padding:'0.5em 1em',cursor:'pointer',fontSize:'1.2em',}} onClick={()=>{
                                    if (document.location.pathname.includes(ADMIN_ROUTE)) {
                                        navigate('/'+encodeURI(d)+ADMIN_ROUTE);
                                    } else {
                                        navigate('/'+encodeURI(d));
                                    }
                                    //window.scrollTo(0,0);
                                    //inface.setCategory(d);
                                    //setCategory(d);

                                }}>{d}</div>
                            )}
                        </div>
                    </div>
                </div>
                :
                <div style={{fontWeight:'bold',fontSize:'1.3em'}}>{category === ""?categories[0]:category}</div>
            }
            <div style={{maxWidth:'100%',width:inface.mobile ?'100%':'auto',display:'grid',gridTemplateColumns:inface.mobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',gridGap:inface.mobile ? '1em' : '2em',padding:'1em',}}>
                {inface.blocks.filter(d=>d.type === 'Товар' && (!category.length || JSON.parse(d.obj || "{}").category === inface.category)).slice().sort((a,b)=>a.priority-b.priority).map((d,key)=><Distrib data={d} key={category+d.id}/>)}
            </div>
        </div>

    </div>
    )
});
export default Block;