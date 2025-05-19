import { useState, useEffect } from 'react';
import { Storage } from '../data/storage';

export const useStorage = (key, initialValue = null) => {
  const [data, setData] = useState(() => {
    try {
      const storedData = Storage.get(key);
      return storedData !== null ? storedData : initialValue;
    } catch (error) {
      console.error('Error initializing storage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (data !== null) {
      try {
        Storage.save(key, data);
      } catch (error) {
        console.error('Error saving data:', error);
      }
    }
  }, [key, data]);

  const updateData = (newData) => {
    try {
      setData(newData);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const removeData = () => {
    try {
      Storage.remove(key);
      setData(null);
    } catch (error) {
      console.error('Error removing data:', error);
    }
  };

  return [data, updateData, removeData];
};