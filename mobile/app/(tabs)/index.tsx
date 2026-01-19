import { useAuth } from '@clerk/clerk-expo'
import React from 'react'
import { Text, ScrollView, Pressable } from 'react-native';



const Chats = () => {
	const { signOut } = useAuth();
import { Text, ScrollView, Pressable } from 'react-native'


const Chats = () => {
	const {signOut} = useAuth();
	return (
		<ScrollView className="bg-surface"
			contentInsetAdjustmentBehavior='automatic'
		>
			<Pressable className='text-white p-5' onPress={() => signOut()}>
				<Text className='text-white p-4 hover:bg-sky-400  rounded-2xl'>SignOut</Text>
			</Pressable>
		</ScrollView>
	)
}

export default Chats