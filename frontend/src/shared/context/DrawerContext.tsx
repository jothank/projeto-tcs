import {createContext, useCallback, useContext, useState} from 'react'

interface IDrawerContextData {
    isDrawerOpen: boolean
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void
}

interface DrawerProps {
    children: React.ReactNode;
  }

interface IDrawerOption {
    icon?: string;
    path: string;
    label: string;

}

const DrawerContext = createContext({} as IDrawerContextData );
 
export const useDraweContext = () => {
    return useContext(DrawerContext)
}

export const AppDrawerProvider: React.FC<DrawerProps> = ({ children }) =>{
    const [isDrawerOpen, setiSDrawerOpen] = useState(false);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toggleDrawerOpen = useCallback(() => {
        setiSDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []);

    const handleSetDrawerOpen = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    // const contextValue: IDrawerContextData = {
    //     isDrawerOpen,
    //     toggleDrawerOpen,
   
    //   };

        return(
            <DrawerContext.Provider value={{isDrawerOpen, toggleDrawerOpen, drawerOptions, setDrawerOptions: handleSetDrawerOpen }}>
                {children}
            </DrawerContext.Provider>
        )
   
}