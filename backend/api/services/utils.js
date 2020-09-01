const express = require('express');
const mongoose = require('mongoose');

exports.defaultError = (res, err) => {
    return res.status(500).json({
        error: err
    })
}