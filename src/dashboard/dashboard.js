import React from 'react';
import ChatListComponent from '../chatlist/chatlist';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import ChatViewComponent from '../chatview/chatview';
class DashboardComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        };
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <ChatListComponent
                    history={this.props.hostory}
                    newChatBtnFn={this.newChatBtnClicked}
                    selectChatFn={this.selectChat}
                    chats={this.state.chats}
                    userEmail={this.state.email}
                    selectedChatIndex={this.state.selectedChat}
                ></ChatListComponent>
                {
                    this.state.newChatFormVisible ?
                        null :
                        <ChatViewComponent
                            user={this.state.email}
                            chat={this.state.chats[this.state.selectedChat]}
                        ></ChatViewComponent>
                }
                <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
            </div>
        )
    }

    signOut = () => firebase.auth().signOut();

    selectChat = (chatIndex) => {
        this.setState({ selectedChat: chatIndex })
    }

    newChatBtnClicked = () => this.setState({
        newChatFormVisible: true, selectedChat: null
    })

    componentDidMount = () => {
        firebase
            .auth()
            .onAuthStateChanged(async _usr => {
                if (!_usr)
                    this.props.history.push('/login');
                else {
                    await firebase
                        .firestore()
                        .collection('chats')
                        .where('users', 'array-contains', _usr.email)
                        .onSnapshot(async res => {
                            const chats = res.docs.map(_doc => _doc.data())
                            await this.setState({
                                email: _usr.email,
                                chats: chats
                            });
                            console.log(this.state);
                        })
                }
            })
    }

}

export default withStyles(styles)(DashboardComponent);