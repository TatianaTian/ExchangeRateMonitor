import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tatiana:tatiispretty@cluster0-cigjb.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

export async function updateNotification(user_email, notification_name, switch_status, bank, value){
    var res;
    const client = await MongoClient.connect(uri, { useNewUrlParser: true })
        .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    try {
        const db = client.db("test");
        let collection = db.collection('users');
        var filter = { email: user_email };
         var newvalues = {
          "$set": new_noti_schema(notification_name, switch_status, bank, value)
        };
        res = await collection.updateOne(filter, newvalues);     
        return res.quote;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
  }

  function new_noti_schema(notification_name, switch_status, bank, value){
    var noti_info;
    var noti_key = "Notification_".concat(notification_name)
    noti_info = 
    {
      [noti_key]:
      {
        status:switch_status,
        bank: bank,
        value: value
      }
    }
    return noti_info
  }

  const newUser = {
    notification_status: true,
    value: 7,
    bank: 'real-time',
  };

  //SaveNotificationData(newUser);
  //exports.updateNotification = updateNotification;
  //updateNotification("tatiana.tian0824@gmail.com","above",true,"bank of China","7.00")