import React from 'react'
import { Button, View, Alert } from "react-native";

export default (props) => {
    return <View style={{ flex: 1 }}>
        <Button
            title="Program list"
            onPress={() => Alert.alert('Simple Button pressed')}
        />

        <Button
            title="Program search"
            onPress={() => Alert.alert('Simple Button pressed')}
        />
    </View>
}
