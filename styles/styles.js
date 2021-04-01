import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    btn: (type) =>  ({
        padding: 15,
        marginTop: 10,
        backgroundColor: (type === 'Primary') ? '#1e90ff' : (type === 'Danger') ? '#e74c3c' : '#bdc3c7' ,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 1

    }),
    btntext: {
        fontWeight: 'bold',
        color: 'white'
    },
})
