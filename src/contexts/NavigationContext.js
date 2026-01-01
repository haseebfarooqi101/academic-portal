import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const [navigationStack, setNavigationStack] = useState([
    { id: 'dashboard', label: 'Dashboard', type: 'main' }
  ]);
  const [currentModule, setCurrentModule] = useState('dashboard');
  const [moduleData, setModuleData] = useState({});

  const navigateToModule = (moduleId, moduleLabel, moduleType = 'main', data = {}) => {
    // Prevent duplicate navigation to the same module
    if (currentModule === moduleId) {
      return;
    }

    const newItem = { id: moduleId, label: moduleLabel, type: moduleType };
    
    if (moduleType === 'main') {
      // Reset to main module
      setNavigationStack([newItem]);
    } else {
      // Check if we're already at this level to prevent duplicates
      const existingIndex = navigationStack.findIndex(item => item.id === moduleId);
      if (existingIndex !== -1) {
        // Navigate back to existing level
        const newStack = navigationStack.slice(0, existingIndex + 1);
        setNavigationStack(newStack);
      } else {
        // Add new level to stack
        setNavigationStack(prev => [...prev, newItem]);
      }
    }
    
    setCurrentModule(moduleId);
    setModuleData(data);
  };

  const navigateToSubModule = (subModuleId, subModuleLabel, data = {}) => {
    navigateToModule(subModuleId, subModuleLabel, 'sub', data);
  };

  const navigateToDetailModule = (detailId, detailLabel, data = {}) => {
    navigateToModule(detailId, detailLabel, 'detail', data);
  };

  const navigateBack = () => {
    if (navigationStack.length > 1) {
      const newStack = navigationStack.slice(0, -1);
      setNavigationStack(newStack);
      const previousModule = newStack[newStack.length - 1];
      setCurrentModule(previousModule.id);
      // Clear module data when going back
      setModuleData({});
    }
  };

  const navigateToLevel = (level) => {
    if (level < navigationStack.length) {
      const newStack = navigationStack.slice(0, level + 1);
      setNavigationStack(newStack);
      const targetModule = newStack[newStack.length - 1];
      setCurrentModule(targetModule.id);
      // Clear module data when navigating to different level
      setModuleData({});
    }
  };

  const getBreadcrumbs = () => {
    return navigationStack.map((item, index) => ({
      ...item,
      isLast: index === navigationStack.length - 1,
      level: index
    }));
  };

  const getCurrentModuleData = () => moduleData;

  const isCurrentModule = (moduleId) => currentModule === moduleId;

  return (
    <NavigationContext.Provider value={{
      navigationStack,
      currentModule,
      navigateToModule,
      navigateToSubModule,
      navigateToDetailModule,
      navigateBack,
      navigateToLevel,
      getBreadcrumbs,
      getCurrentModuleData,
      setModuleData,
      isCurrentModule
    }}>
      {children}
    </NavigationContext.Provider>
  );
};