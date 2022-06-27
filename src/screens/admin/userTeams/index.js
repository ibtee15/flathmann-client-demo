import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import {Colors, Dim} from '../../../constants/Theme';
import {Fonts} from '../../../constants/fonts';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {getUserTeams} from '../../../services/team.services';

const UserTeams = props => {
  const goBackHandler = () => {
    props.navigation.goBack();
  };

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = props.route.params.userId;
  const user = useSelector(state => state.authReducer.user);

  useEffect(() => {
    const fnt = async () => {
      try {
        setLoading(true);
        const response = await getUserTeams(userId, user?.token);
        // console.log('all teams successfull =====>>>', response.data);
        setUserData(response.data);
      } catch (error) {
        console.log('Err at getUserTeams at userTeams', error);
      } finally {
        setLoading(false);
      }
    };
    fnt();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.darkBlue} />
      <Image
        style={{position: 'absolute', bottom: 0}}
        source={require('../../../assets/images/racket.png')}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors.blue, Colors.white]}
            refreshing={loading}
            // onRefresh={() => RefreshPage()}
          />
        }
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../../../assets/images/header.png')}
          style={{width: Dim.w, height: Dim.w * 0.45, marginBottom: 20}}>
          <TouchableOpacity onPress={goBackHandler} style={styles.backBtn}>
            <Entypo name="chevron-left" size={25} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>USER TEAMS</Text>
        </ImageBackground>

        {userData &&
          userData.map((v, i) => {
            return (
              <View style={styles.teamView}>
                <View style={styles.subHeadView}>
                  <Text style={styles.subHead}>{v.teamName}</Text>
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('TeamDetails', {
                          team_id: v._id,
                        })
                      }
                      style={{marginRight: 13}}>
                      <Entypo name="eye" size={20} color={Colors.darkBlue} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('EditTeam', {
                          team_id: v._id,
                        })
                      }>
                      <FontAwesome
                        name="edit"
                        size={20}
                        color={Colors.darkBlue}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.detailView}>
                  {/* <View style={styles.row}>
                    <Text style={styles.id}>Colour :</Text>
                    <Text style={styles.bold}> {v.teamColor}</Text>
                  </View> */}
                  <View style={styles.row}>
                    <Text style={styles.id}>Nickname :</Text>
                    <Text style={styles.bold}> {v.teamNickName}</Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserTeams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  backBtn: {
    padding: Dim.w * 0.05,
    paddingBottom: Dim.w * 0.03,
  },
  headerTxt: {
    fontSize: 33,
    fontFamily: Fonts.heading,
    color: Colors.whiteO,
    marginLeft: Dim.w * 0.1,
  },
  imgHeader: {
    width: Dim.w,
    height: Dim.w * 0.45,
  },
  teamView: {
    width: Dim.w * 0.85,
    padding: 15,
    backgroundColor: Colors.lightgrey,
    alignSelf: 'center',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  subHeadView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dim.w * 0.76,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    paddingBottom: 3,
  },
  subHead: {
    fontFamily: Fonts.bold,
    fontSize: 19,
    color: Colors.darkBlue,
  },
  row: {flexDirection: 'row', alignItems: 'center'},
  detailView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Dim.w * 0.76,
    alignSelf: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  id: {
    color: Colors.darkBlue,
    fontFamily: Fonts.semiBold,
  },
  bold: {
    color: Colors.darkBlue,
    fontFamily: Fonts.medium,
  },
});
