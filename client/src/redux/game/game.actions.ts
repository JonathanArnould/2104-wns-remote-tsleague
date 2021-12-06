// eslint-disable-next-line import/no-cycle
import { ClassMate } from './game.reducer';

export type Position = {
  positionX: string;
  positionY: string;
};

export type Action =
  | {
      type: 'STUDENT_MODAL_TOGGLE';
    }
  | {
      type: 'STUDENT_GAME_POSITION';
      payload: Position;
    }
  | {
      type: 'CLASSMATES_GAME_POSITION';
      classMates: ClassMate[];
    }
  | {
      type: 'CLASSMATE_LOGOUT';
      socketId: string;
    };

const studentModalToggle = (): Action => ({
  type: 'STUDENT_MODAL_TOGGLE',
});

const getStudentPosition = (payload: Position): Action => ({
  type: 'STUDENT_GAME_POSITION',
  payload,
});

export default { studentModalToggle, getStudentPosition };
