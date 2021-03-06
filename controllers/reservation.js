
const reservations = require('../models/reservation');

module.exports.reserve = (req, res) => {
    console.log('reServe');

    const newReservation = {
        ...req.body,
        client: req._id
    }

    new reservations(newReservation).save()
        .then(res.json({ msg: 'reservation added successfully' }));
}

module.exports.update_reservation = (req, res) => {
    Profile.update({ _id: req.params.id }, { status: 'none' })
        .then(res.json({ msg: 'profile successfully updated' }));

}


module.exports.get_myReservations = (req, res) => {

    console.log('myreservations');
    reservations.find({ client: req._id })
        .then(reservation => res.json(profile));

}

module.exports.get_myAppointments = (req, res) => {

    console.log('appointments');
    console.log(req._id);

    if (req.role === 'expert') {
        reservations.find({ expert: req._id, status: { $in: ["waiting"] } })
            .then(appointments => {
                console.log("appointments", appointments);
                res.json(appointments);
            });
    }
    else
        reservations.find({ client: req._id, status: { $in: ["rejected", "accepted"] } })
            .populate('expert', 'login').then(appointments => {
                console.log("appointments client", appointments);
                res.json(appointments);
            });
}

module.exports.set_ReservationStatus = (req, res) => {
    console.log('expert', req._id, req.body, 'id:', req.params.id);

    const status = req.body.status;

    if (status === 'accepted') {
        reservations.updateOne(
            { expert: req._id, _id: req.params.id },
            {
                status: status,
                createdAt: new Date()
            }

        ).then(res => res.json('successfully validated'))
            .catch(err => console.log(err));
    }
    else {
        reservations.updateOne(
            { expert: req._id, _id: req.params.id },
            { status: status }

        ).then(res => res.json('successfully validated'))
            .catch(err => console.log(err));
    }



}


module.exports.getMissions = (req, res) => {

    reservations.find({ expert: req._id, status: { $in: ["report", "accepted"] } })
        .populate('client')
        .then(result => res.json(result))
        .catch(err => console.log(err));
}


module.exports.getClienthistory = (req, res) => {
    reservations.find({ client: req._id, status: "report" })
        .then(result => res.json(result))
        .catch(err => console.log(err));
}

module.exports.getMission = (req, res) => {
    console.log('mission id', req.params.id);
    reservations.findById(req.params.id)
        .populate('client')
        .then(result => {
            console.log("zaeazeaze" + result)
            res.json(result)
        })
        .catch(err => console.log(err));
}



