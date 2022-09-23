import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import  { BiBuildingHouse } from "react-icons/bi";
import {RiFileList3Line} from "react-icons/ri";
import {GrDropbox} from "react-icons/gr";
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '../Dashboard',
    icon: <AiIcons.AiFillHome style={{color: "white", marginRight: "1rem", fontSize: "1.3rem"}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Kategoritë',
    path: '/kategorite',
    icon: <IoIcons.IoIosPaper style={{color: "white", marginRight: "1rem", fontSize: "1.3rem"}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Furnizuesit',
    path: '/furnitoret',
    icon: <BiBuildingHouse style={{color: "white", marginRight: "1rem", fontSize: "1.3rem"}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Produktet',
    path: '/products',
    icon: <GrDropbox style={{color: "white", marginRight: "1rem", fontSize: "1.3rem"}}/>,
    cName: 'nav-text'
  },
  {
    title: 'Shitjet',
    path: '/sales',
    icon: <RiFileList3Line style={{color: "white", marginRight: "1rem", fontSize: "1.3rem"}}/>,
    cName: 'nav-text'
  }
];