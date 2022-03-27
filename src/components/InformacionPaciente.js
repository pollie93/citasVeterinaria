import React from 'react'
import { Text, SafeAreaView, View, Pressable, StyleSheet } from 'react-native'
import { formatearFecha } from '../helpers'

const InformacionPaciente = ({paciente, setPaciente, setModalPaciente}) => {
    
    return (
        <SafeAreaView
            style={styles.contenedor}
        >
            <Text style={styles.titulo}>Informacion {''}
                <Text style={styles.tituloBold}>Paciente</Text>
            </Text>

            <View>
                <Pressable
                    style={styles.btnCerrar}
                    onLongPress={() => {
                        setModalPaciente(false)
                        setPaciente({})
                    }}
                >
                    <Text
                        style={styles.btnCerrarTexto}
                    >X Cerrar</Text>
                </Pressable>
            </View>

            <View
                style={styles.contenido}
            >
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.valor}>{paciente.paciente}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Propietario:</Text>
                    <Text style={styles.valor}>{paciente.propietario}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.valor}>{paciente.email}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Telefono:</Text>
                    <Text style={styles.valor}>{paciente.telefono}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Fecha Alta:</Text>
                    <Text style={styles.valor}>{formatearFecha(paciente.fecha)}</Text>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Síntomas:</Text>
                    <Text style={styles.valor}>{paciente.sintomas}</Text>
                </View>
                
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    contenedor: {
        backgroundColor: '#F59E0B',
        flex: 1
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold:{
        fontWeight: '900'
    },
    btnCerrar: {
        marginVertical: 30,
        backgroundColor: '#E06900',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCerrarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    contenido: {
        backgroundColor: '#FFF',
        marginHorizontal: 30,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000", // color de la sombra
        shadowOffset: {        // es la ubicación de la sombra, se estira en una dirección
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,// va del 0 al 1, 1 es lo mas opaco
        shadowRadius: 3.84, // indica qué tanto se va a expandir la sombra, se mueve en todas las direcciones
        elevation: 5, //se hacen los calculos para la sombra, mas para aplicaciones nativas de android
    },
    campo: {
        marginBottom: 10
    },
    label: {
        textTransform: 'uppercase',
        color: '#374151',
        fontWeight: '600',
        fontSize: 12
    },
    valor: {
        fontWeight: '700',
        fontSize: 20,
        color: '#334155'

    }
})

export default InformacionPaciente