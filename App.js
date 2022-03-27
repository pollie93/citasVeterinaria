import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
  Alert
} from 'react-native';
import Formulario from './src/components/Formulario' // ruta o path
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';


const App = () => {  // aca estoy definiendo mis componentes. Debajo debo definir hooks

  // Los hooks se colocan en la parte superior
  const [modalVisible, setModalVisible] = useState(false) // ASI DECLARO HOOKS
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = id => {
    const pacienteEditar = pacientes.filter(paciente => paciente.id === id) //el filter me retorna un arreglo
    setPaciente(pacienteEditar[0]);
  }

  const pacienteEliminar = id => {
    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { text: 'Cancelar' },
        { text: 'Si, Eliminar', onPress: () => {
            const pacientesActualizados = pacientes.filter( pacientesState => pacientesState.id !== id ) // permite sacar un elemento o varios del arreglo
            setPacientes(pacientesActualizados)
        }}
      ]
    )
  }

  const cerrarModal = () => {
    setModalVisible(false)

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Administrador de Citas {''}
      <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable
        style={ styles.btnNuevaCita }
        onPress={() => setModalVisible(!modalVisible)}
      >
        <Text
          style={styles.btnTextoNuevaCita}
        >Nueva Cita</Text>
      </Pressable>

      {pacientes.length === 0 ? 
        <Text style={styles.noPacientes}>No hay pacientes aún</Text> : 
        <FlatList 
          data={pacientes}
          style={styles.listado}
          keyExtractor={(item) => item.id} // BUSCA EN EL ARREGLO DE PACIENTES, X UN VALOR Q SEA UNICO
          renderItem={({item}) => {
            return(
              <Paciente 
                item={item}
                setModalVisible={setModalVisible}
                setPaciente={setPaciente}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
              />
            )
          }} // son los componenentes que se tienen que mostrar de rn una vez que se itera sobre los pacientes. 
        />
      }

      {modalVisible && (
          <Formulario 
            cerrarModal={cerrarModal}
              pacientes={pacientes}
              setPacientes={setPacientes}
              paciente={paciente}
              setPaciente={setPaciente}
          />
      )}


      <Modal
        visible={modalPaciente}
        animationType='slide'
      >
        <InformacionPaciente 
          paciente={paciente}
          setPaciente={setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#F3F4F6', // El tpo de escritura es cammelCase
    flex: 1
  },
  titulo: {
    textAlign: 'center', 
    fontSize: 30,
    color: '#374151',
    fontWeight: '600'
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNuevaCita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30, //20
    marginHorizontal: 20,
    borderRadius:10
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20, //18
    fontWeight: '900', //negritas
    textTransform: 'uppercase'
  },
  noPacientes: {
    color: '#808080',
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 50 //30
  }

})

export default App;
