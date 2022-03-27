import React, { useState, useEffect } from "react"
import { Modal, SafeAreaView, Text, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native'
import DatePicker from 'react-native-date-picker'

// const Formulario = (props) => {
//     const {modalVisible} = props // desde props estamos destructurando la variable modalVisible

const Formulario = ({ 
    modalVisible,
    cerrarModal,
    pacientes, 
    setPacientes, 
    paciente: pacienteObj, 
    setPaciente: setPacienteApp 
}) => {

    const [paciente, setPaciente] = useState('')
    const [id, setId] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date()) //da la fehca de hoy
    const [sintomas, setSintomas] = useState('')

    useEffect(() => {
        if(Object.keys(pacienteObj).length > 0 ) {
            setId(pacienteObj.id)
            setPaciente(pacienteObj.paciente)
            setPropietario(pacienteObj.propietario)
            setEmail(pacienteObj.email)
            setTelefono(pacienteObj.telefono)
            setFecha(pacienteObj.fecha)
            setSintomas(pacienteObj.sintomas)
        }
    }, [pacienteObj])

    // cuando se llena el obj, se vuelve a ejecutar el useEffect, volviendo a ejecutar el componente

    const handleCita = () => { 
        // VALIDAR
        if([paciente, propietario, email, fecha, sintomas].includes('') ) {// arreglo
        // con el .inlcudes hacemos un método de arreglo. y revisa que todos tengan una condición
            Alert.alert(
                'Error',  // Título de la alerta
                'Todos los campos son obligatorios' // Descripcion del problema
                // [{text: 'Cancel'}, {text: 'Ok'}] // arreglo, cant de botones
            )
            return
        }

        // Revisar si es un registro nuevo o edicion
        // si hay un ID significa que estamos editando, con Else nuevo registro
        // CREO UN OBJETO con los datos del formulario

        const nuevoPaciente = {
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }
        // Editando, agrego las variables de mi objeto
        if(id) {
            nuevoPaciente.id = id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState ) 
            // que nos devuelve un arreglo new
            // .map no modifica arreglo original, y permite actulizar el state
            setPacientes(pacientesActualizados)
            setPacienteApp({})

        } else {
            nuevoPaciente.id = Date.now()
            setPacientes([...pacientes, nuevoPaciente]) // ACA PIDO Q TOME COPIA Y AGREGUE NUEVO PACIENTE
        }
        cerrarModal()
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
    }


    return (
        <Modal
            animationType='slide'
            visible={modalVisible}
        >
            <SafeAreaView style={styles.contenido}>
                <ScrollView>
                    <Text
                        style={styles.titulo}
                    >{pacienteObj.id ? 'Editar' : 'Nueva'} {''}
                        <Text style={styles.tituloBold}>Cita</Text>
                    </Text>

                    <Pressable 
                        style={styles.btnCancelar}
                        onLongPress={() => {
                            cerrarModal()
                            setPacienteApp({})
                            setId('')
                            setPaciente('')
                            setPropietario('')
                            setEmail('')
                            setTelefono('')
                            setFecha(new Date())
                            setSintomas('')
                        }}
                    >
                        <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre Paciente'
                            placeholderTextColor={'#666'}
                            value={paciente}
                            onChangeText={setPaciente}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Nombre Propietario'
                            placeholderTextColor={'#666'}
                            value={propietario}
                            onChangeText={setPropietario}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Email Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Email Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType='email-address'
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono Propietario</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Telefono Propietario'
                            placeholderTextColor={'#666'}
                            keyboardType='number-pad'
                            value={telefono}
                            onChangeText={setTelefono}
                            maxLength={10} // max cantidad de digitos a escribir
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Fecha Alta</Text>

                        <View style={styles.fechaContenedor}> 
                            <DatePicker 
                                date={fecha}
                                locale='es'
                                onDateChange={ (date) => setFecha(date)}
                            />
                        </View>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas</Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            placeholder='Sintomas Paciente'
                            placeholderTextColor={'#666'}
                            value={sintomas}
                            onChangeText={setSintomas}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>

                    <Pressable
                        style={styles.btnNuevaCita}
                        onPress={handleCita} 
                    >
                        <Text style={styles.btnNuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente</Text>
                    </Pressable>

                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
} 

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1,
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
    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,
    },
    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#FFF',
        color: '#000',
        padding: 15,
        borderRadius: 10,
    },
    sintomasInput: {
        height: 100
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10   
    },
    btnNuevaCitaTexto: {
        color: '#5827A4',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    } 
})

export default Formulario