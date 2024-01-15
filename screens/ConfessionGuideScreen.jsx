import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ZoomButtons } from '../components/ButtonComponent';
import colors from '../components/colors';

import HeaderComponent from '../components/HeaderComponent';
import Screen from '../components/Screen';
import fonts from '../config/fonts';

const guide = [
    {
        id: 1,
        title: 'Before going to confession',
        content: "1. Pray. Ask God to give you the grace to make a good confession.\n\n2. Examine your conscience. Reflect on your life, trying to recall all the times you sinned against God since your last confession. Use an Examination of Conscience to help you.\n\n3. Be truly sorry for your sins.\n\n4. Make the resolution to avoid committing these sins in the future."
    },
    {
        id: 2,
        title: 'During confession',
        content: "1. Upon entering the confessional take your place. You may choose to either confess anonymously by going behind the screen or by going face-to-face if this option is available. Depending on the confessional, you may either kneel or sit.\n\n2. Greet the priest. A simple “Good Morning” or “Good Evening” will do.\n\n3. Then make the sign of the Cross and say the following: “Bless me father, for I have sinned. It has been (state how many days, weeks, months, or years) since my last confession. These are my sins.”\n\n4. At this time, confess your sins briefly and clearly. It might be helpful to start with the one that is most difficult to say since it will make it easier to mention the rest. Remember that for a confession to be valid all mortal sins must be confessed. If you do not know whether a sin is mortal or not, ask the priest for guidance. If you do not know what to say, feel uneasy or ashamed, simply ask the priest to assist you. Be assured that he will help you to make a good confession. Simply answer the questions he might ask you without hiding anything out of shame or fear. Place your trust in God who is your merciful Father and wants to forgive you.\n\n5. When you finish confessing your sins, say: “…and I am truly sorry for all my sins.”\n\n6. The priest will then give you some words of advice and/or encouragement to help you become a better person and a more faithful disciple of Jesus Christ.\n\n7. Following this, he will assign you a penance which you are to do when you leave the confessional. It might be something like saying a few prayers, doing an act of charity, or making some sacrifice. Whatever it is, make sure that you understand it clearly and that you remember to do it later.\n\n8. After giving you the penance, the priest will ask you to say the Act of Contrition. You may say whichever one you know. If you do not know an Act of Contrition, ask the priest to assist you.\n\n9. When you are finished praying the Act of Contrition, the priest will say the Prayer of Absolution. Listen attentively to that prayer, bless yourself as he makes the Sign of the Cross and at the end of the prayer, answer, “Amen.”\n\n10. After giving you absolution, the priest will say, “Give thanks to the Lord for He is good.” at which you respond, “His mercy endures forever.” The priest then conc"
    },
    {
        id: 3,
        title: 'After confession',
        content: "1. Say a prayer of thanksgiving. Give thanks to God for the gift of his infinite mercy and for the sacrament you have just received.\n\n2. Do your penance. It is advisable that you do your penance as soon as possible so that you will not forget to do it"
    },
]

const ConfessionGuideScreen = ({ navigation })=> {
    const [fontSize, setFontSize] = useState(fonts.fontSizeNormal);
    
    return (
        <Screen>
            <HeaderComponent
                backEnabled
                navigation={navigation}
                title={'Guide to confession'}
            />
            <ScrollView>
                {guide.map((g, index)=> (
                    <View key={index} style={{ marginBottom: 50 }}>
                        <Text style={{ color: colors.primary, fontSize: fonts.fontSizeMedium, fontWeight: 'bold', marginBottom: 10 }}>{g.title}</Text>
                        <Text style={{ color: colors.light, lineHeight: 25, fontSize: fontSize }}>{g.content}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={{position: 'relative'}}>
                <ZoomButtons 
                    style={{marginBottom: 120}}
                    onZoomIn={()=> fontSize < fonts.fontSizeLarge && setFontSize(fontSize +1)}
                    onZoomOut={()=> fontSize > fonts.fontSizeNormal && setFontSize(fontSize -1)}
                />
            </View>
        </Screen>
    )
}

export default ConfessionGuideScreen;