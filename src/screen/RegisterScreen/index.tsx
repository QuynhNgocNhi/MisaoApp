<SafeAreaView style={styles.screenContainer}>
    <StatusBar translucent backgroundColor='transparent' />
    <View >
        <View style={styles.top}>
            <View style={styles.box}>
                <ImageBackground source={require('../../assets/image/meo.jpg')} resizeMode="cover" style={styles.image}>
                    <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
                    <Svg
                        height={900}
                        width={Dimensions.get('screen').width}
                        viewBox="0 0 1440 320"

                    >
                        <Path
                            fill="#ffffff"
                            d='M0,64L48,74.7C96,85,192,107,288,101.3C384,96,480,64,576,90.7C672,117,768,203,864,234.7C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
                        />
                    </Svg>

                </ImageBackground>

            </View>




            <View style={styles.footer}>
                <View style={styles.form}>
                    <View style={styles.buttonsGroup}>

                        <UnderlineTextInput

                            blurOnSubmit={false}
                            keyboardType="email-address"
                            placeholder="Số điện thoại của bạn"
                            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                            inputTextColor={INPUT_TEXT_COLOR}
                            borderColor={INPUT_BORDER_COLOR}
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}
                            inputContainerStyle={styles.inputContainer}
                        />
                    </View>
                    <View style={styles.buttonsGroup}>

                        <UnderlinePasswordInput

                            returnKeyType="done"
                            placeholder="Nhập mật khẩu của bạn"
                            placeholderTextColor={PLACEHOLDER_TEXT_COLOR}
                            inputTextColor={INPUT_TEXT_COLOR}

                            borderColor={INPUT_BORDER_COLOR}
                            focusedBorderColor={INPUT_FOCUSED_BORDER_COLOR}

                        />
                    </View>
                    <View style={styles.buttonsGroup}>
                        <Button
                            buttonStyle={styles.customButton}
                            onPress={this.navigateTo('SignIn')}
                            title={'Đăng nhập'.toUpperCase()}
                        />

                    </View>
                    <View style={styles.vSpacer} />
                    <View style={styles.forgotPassword}>
                        <Text
                            // onPress={this.showInputModal(true)}
                            onPress={this.navigateTo('ForgotPassword')}
                            style={styles.forgotPasswordText}>
                            Forgot password?
                        </Text>
                    </View>
                </View>
            </View>
        </View>

    </View >
</SafeAreaView>