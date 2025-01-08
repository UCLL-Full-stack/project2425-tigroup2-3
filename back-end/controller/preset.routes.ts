/**
 * @swagger
 * components:
 *   schemas:
 *     PieceInput:
 *       type: object
 *       required:
 *         - type
 *         - color
 *       properties:
 *         type:
 *           type: string
 *           default: "BISHOP"
 *         color:
 *           type: string
 *           default: "BLACK"
 *     ReskinInput:
 *       type: object
 *       required:
 *         - pieceInput
 *         - themeId
 *       properties:
 *         pieceInput:
 *           $ref: '#/components/schemas/PieceInput'
 *         themeId:
 *           type: integer
 *           default: 5
 *     PresetInput:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - reskinInputs
 *       properties:
 *         userId:
 *           type: integer
 *           default: 4
 *         name:
 *           type: string
 *           description: The name of the preset (e.g., "strifeng").
 *         reskinInputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ReskinInput'
 *           description: A list of reskin configurations.
 *     Preset:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Preset id
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *           reskins:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Reskin'
 *           user:
 *             $ref: '#/components/schemas/User'
 *     Reskin:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Reskin id
 *             type: integer
 *             format: int64
 *           for:
 *             type: string
 *             enum: [Pawn, Knight, King]
 *           as:
 *             type: string
 *             enum: [black, white] 
 *           theme:
 *             $ref: '#/components/schemas/Theme'           
 *     Theme:
 *         type: object
 *         properties:
 *           id:
 *             minimum: 1  # Added minimum for Theme id
 *             type: integer
 *             format: int64
 *           name:
 *             type: string
 *           description:
 *             type: string
 *  
 */

import express, { NextFunction, Request, Response } from 'express';
import presetService from '../service/preset.service';
import { PresetInput } from '../types';

const presetRouter = express.Router();


/**
 * @swagger
 * /preset/{userId}:
 *   get:
 *     summary: Get a list of presets by the user id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of Preset objects.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preset'
 */

presetRouter.get('/:userId', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        
        const presets = await presetService.getPresetsByUser({ userId });

        res.json(presets);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /preset/active/{userId}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the active preset by the user id
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A Preset object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preset'
 */
presetRouter.get('/active/:userId', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const userId = parseInt(req.params.userId);
        
        const preset = await presetService.getActivePresetByUser({ userId });

        res.json(preset);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /preset/active/{presetId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: set the active preset by the preset id
 *     parameters:
 *       - in: path
 *         name: presetId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: the new active Preset object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Preset'
 */
presetRouter.put('/active/:presetId', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const presetId = parseInt(req.params.presetId);
        const userId = req.auth.userId;
        const activePreset = await presetService.setActivePreset({userId, presetId});

        res.status(200).json(activePreset);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /preset:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new preset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PresetInput'
 *     responses:
 *       200:
 *         description: Successfully created the preset
 *       400:
 *         description: Invalid input
 */
presetRouter.post('/', async (req: Request & {auth: any}, res: Response, next: NextFunction) => {
    try {
        const preset = <PresetInput> req.body;
        const newPreset = await presetService.createPreset(preset);
        res.status(200).json(newPreset);
    } catch (error) {
        next(error);
    }
});


export { presetRouter };