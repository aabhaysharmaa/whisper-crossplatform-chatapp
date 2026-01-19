import { useAuthSocial } from '@/hooks/useSocialAuth';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { ActivityIndicator, Dimensions, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
	const { handleSocialAuth, loadingStrategy } = useAuthSocial();
	return (
		<View className='flex-1 bg-surface-dark'>
			{/* todo : animated orbs */}
			<View className='absolute inset-0 overflow-hidden'></View>
			<SafeAreaView className='flex-1'>
				{/* Top Section */}
				<View className='items-center pt-10'>
					<Image source={require("../../assets/images/logo.png")} style={{ width: 100, height: 100, marginVertical: -20 }} contentFit='contain' />
					<Text className='text-4xl font-bold text-primary font-serif tracking-wide uppercase'
					>Whisper</Text>
				</View>
				{/* CENTER SECTION - HERO IMAGE */}
				<View className='flex-1 justify-center items-center px-6'>
					<Image source={require("../../assets/images/auth-screen-illustrate.png")} style={{
						width: width - 48,
						height: height * 0.3
					}}
						contentFit='contain' />
					{/* Heading */}
					<View className='mt-6 items-center '>
						<Text className='text-5xl  text-foreground font-serif  text-center'>Connect & Chat </Text>
						<Text className=' font-bold text-3xl text-primary font-mono   text-center'>Seamlessly</Text>
						{/* Auth Buttons */}
						<View className='flex flex-row mt-10 gap-4'>
							<Pressable
								accessibilityRole='button'

								className='w-1/2  flex flex-1 flex-row items-center justify-center  active:scale-[0.97] gap-2 bg-white/90  py-4 rounded-2xl'
								disabled={loadingStrategy === "oauth_google"}
								onPress={() => handleSocialAuth("oauth_google")}
							>
								{/* */}
								{loadingStrategy === "oauth_apple" || loadingStrategy === "oauth_google" ? (<ActivityIndicator size={"small"} color={"#1a1a1a"} />) : (
									<>


										<Image source={require("../../assets/images/google.png")} style={{
											width: 20,
											height: 20
										}}
											contentFit='contain' />
										<Text className='font-bold text-sm text-gray-900'>Google</Text>
									</>
								)}
							</Pressable>
							<Pressable

								accessibilityRole='button'
								className='w-1/2  flex flex-1 flex-row items-center justify-center  active:scale-[0.97] gap-2 bg-white/10  py-4 rounded-2xl'
								disabled={loadingStrategy === "oauth_apple" || loadingStrategy === "oauth_google"}
								onPress={() => handleSocialAuth("oauth_apple")}
							>
								{/* */}
								{loadingStrategy === "oauth_apple" ? (<ActivityIndicator size={"small"} color={"#ffffff"} />) : (
									<>

										<Ionicons name='logo-apple' size={20} color={"#ffffff"} />
										<Text className='font-bold text-sm text-foreground'>Apple</Text>
									</>
								)}
							</Pressable>
						</View>
					</View>

				</View>
			</SafeAreaView>
		</View>
	)
}

export default AuthScreen

