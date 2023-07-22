import express from "express";

import {deleteUserById, getUserById, getUsers, updateUserById} from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users).end();
    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await deleteUserById(id);
        return res.json(deletedUser).end();

    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);
        if (!user) {
            return res.sendStatus(404);
        }

        const userUpdated = await updateUserById(id, { username });
        return res.json(userUpdated).end();

    } catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
}