import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { CalculadoraScreen } from './src/screens/CalculadoraScreen'
import { styles } from './src/theme/AppTheme';

const App = () => {
  return (
    <SafeAreaView style={ styles.fondo }>
      {/* Diseño barra de notificaciones */}
      <StatusBar 
        backgroundColor='black'
        barStyle={'light-content'}
      />
      
      {/* App */}
      <CalculadoraScreen />
    </SafeAreaView>
  )
}

export default App
 
