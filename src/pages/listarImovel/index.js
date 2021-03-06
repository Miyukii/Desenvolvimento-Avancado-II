import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
//import { buscarTodos } from '../../services/imovelService';
import ImovelList from '../../components/imovelList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { get } from '../../services/api';

function ListarImovel({ navigation }) {
  const [imoveis, setImoveis] = useState([]);
  const [idUsuario, setIdUsuario] = useState(0);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const imovelState = useSelector(state => state.imovel);

  useEffect(() => {
    setIdUsuario(auth.usuario._id);
    obterImoveis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.navigate('Main');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imovelState.navegar]);

  useEffect(() => {
    async function fetchData() {
      await obterImoveis();
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imovelState.imovel]);

  useEffect(() => {
    async function fetchData() {
      await obterImoveis();
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imovelState.irPraMain, navigation]);

  async function obterImoveis() {
    let imoveisObtidos;
    if (imovelState?.pesquisa || imovelState?.irPraMain) {
      imoveisObtidos = imovelState.imoveis;
    } else {
      imoveisObtidos = await buscarTodos();
    }
    if (imoveisObtidos.length === 0) {
      var mensagem = {
        tipo: 1,
        texto: 'Não foram encontrados imóveis para exibir',
      };
      dispatch({
        type: 'SET_MENSAGEM',
        mensagem,
      });
    }
    setImoveis(imoveisObtidos);
  }

  function buscarTodos() {
    return new Promise((resolve, reject) => {
      get('/imovel/all', 'COM_TOKEN_USUARIO')
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.error);
        });
    });
  }

  function excluir(idImovel) {
    dispatch({
      type: 'EXCLUIR_IMOVEL_REQUEST',
      idImovel,
    });
  }

  function editar(imovel) {
    dispatch({
      type: 'MONTAR_IMOVEL',
      imovel,
    });
    var objeto = {
      edicao: true,
    };
    navigation.navigate('CadastrarImovel', {
      objeto,
    });
  }

  return (
    <View>
      {imoveis.map(imovel => {
        return (
          <View key={imovel._id}>
            <ImovelList imovel={imovel} />
            {imovel.Usuario._id === idUsuario ? (
              <View>
                <TouchableOpacity onPress={() => editar(imovel)}>
                  <Icon name="file" size={18} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => excluir(imovel._id)}>
                  <Icon name="remove" size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <></>
            )}
          </View>
        );
      })}
    </View>
  );
}
export default ListarImovel;
