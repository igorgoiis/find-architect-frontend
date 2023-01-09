import { useContext } from 'react';
import { SideBarDawerContext } from '../context/SidebarDrawerContext';

export const useSidebarDrawer = () => useContext(SideBarDawerContext);
