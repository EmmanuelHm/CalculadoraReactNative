import React, { useRef, useState } from 'react';

enum Operadores { suma, resta, multiplicacion, dividir }

export const useCalculadora = () => {

    const [ numeroAnterior, setNumeroAnterior ] = useState('0')
    const [ numero, setNumero ] = useState('0')

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0')
        setNumeroAnterior('0')
    }

    const armarNumero = (numeroTexto: string) => {

        //No aceptar doble punto
        if(numero.includes('.') && numeroTexto === '.') return;

        if(numero.startsWith('0') || numero.startsWith('-0') ){

            //Punto Decimal
            if(numeroTexto === '.'){
                setNumero( numero + numeroTexto) 
            }
            //Evaluar si es otro cero y hay un punto
            else if (numeroTexto === '0'  && numero.includes('.') ){
                setNumero( numero + numeroTexto) 
            }
            //Evaluar si es diferente de cero y tiene un punto
            else if( numeroTexto != '0' && !numero.includes('.') ){
                setNumero( numeroTexto )
            }
            //Evitar 0000.0
            else if (  numeroTexto === '0' && !numero.includes('0') ){
                setNumero( numero )
            }
            else{
                setNumero(numero + numeroTexto)
            }

        }else{
            setNumero(numero + numeroTexto)
        }

    }

    const positivoNegativo = () => {
        if( numero.includes('-') ){
            setNumero(numero.replace('-', ''))
        }
        else{
            setNumero('-' + numero)
        }
    }

    const btnDel = () => {

        let negativo = '';
        let numeroTemp = numero; 

        if(numero.includes('-')){
            negativo = '-';
            numeroTemp = numero.substring(1);
        }

        if( numeroTemp.length > 1 ){
            setNumero( negativo + numeroTemp.slice(0, -1) );
        }
        else{
            setNumero('0')
        }
    }

    const cambiarNumPorAnterior = () => {

        if(numero.endsWith('.')){
            setNumeroAnterior( numero.slice(0,-1) )
        }else{
            setNumeroAnterior( numero )
        }
        setNumero('0')
    }

    const btnDivir = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.dividir
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.multiplicacion
    }

    const btnRestar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.resta
    }

    const btnSumar = () => {
        cambiarNumPorAnterior()
        ultimaOperacion.current = Operadores.suma
    }

    const calcular = () => {
        //Casteando Strings para operaciones 
        const num1 = Number( numero )
        const num2 = Number( numeroAnterior )

        switch (ultimaOperacion.current) {
            case Operadores.suma:
                setNumero(`${ num1 + num2}`);
                break;

            case Operadores.resta:
                setNumero(`${ num2 - num1}`);
                break;

            case Operadores.multiplicacion:
                setNumero(`${ num1 * num2}`);
                break;

            case Operadores.dividir:
                setNumero(`${ num2 / num1}`);
                break;
        } 
        setNumeroAnterior('0');
    }

    return {
        numeroAnterior,
        numero, 
        limpiar, 
        positivoNegativo,
        btnDel,
        btnDivir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    }
}
