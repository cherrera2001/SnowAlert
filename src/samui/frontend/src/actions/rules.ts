import {Dispatch} from 'redux';
import * as api from '../api';
import {SnowAlertRule, State} from '../reducers/types';
import {createAction, ActionWithPayload, GetState} from './action-helpers';
import {ActionsUnion} from './types';

// load rules
export const LOAD_SNOWALERT_RULES_REQUEST = 'LOAD_SNOWALERT_RULES_REQUEST';
export const LOAD_SNOWALERT_RULES_SUCCESS = 'LOAD_SNOWALERT_RULES_SUCCESS';
export const LOAD_SNOWALERT_RULES_FAILURE = 'LOAD_SNOWALERT_RULES_FAILURE';

export type LoadRulesPayload = ReadonlyArray<SnowAlertRule>;

export const LoadRulesActions = {
  loadSnowAlertRulesRequest: () => createAction(LOAD_SNOWALERT_RULES_REQUEST),
  loadSnowAlertRulesSuccess: (response: LoadRulesPayload) => createAction(LOAD_SNOWALERT_RULES_SUCCESS, response),
  loadSnowAlertRulesFailure: (errorMessage: string) => createAction(LOAD_SNOWALERT_RULES_FAILURE, errorMessage),
};

export type LoadRulesActions = ActionsUnion<typeof LoadRulesActions>;

const shouldLoadSnowAlertRules = (state: State) => {
  const rules = state.rules;
  return !rules.isFetching;
};

export const loadSnowAlertRules = () => async (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  if (shouldLoadSnowAlertRules(state)) {
    dispatch(LoadRulesActions.loadSnowAlertRulesRequest());

    try {
      const response = await api.loadSnowAlertRules();
      dispatch(LoadRulesActions.loadSnowAlertRulesSuccess(response.rules));
    } catch (error) {
      dispatch(LoadRulesActions.loadSnowAlertRulesFailure(error.message));
    }
  }
};

type RuleTarget = SnowAlertRule['target'];
type RuleType = SnowAlertRule['type'];

// changing rule title
export const CHANGE_TITLE = 'CHANGE_TITLE';
export type ChangeTitleAction = ActionWithPayload<typeof CHANGE_TITLE, {rule: SnowAlertRule; newTitle: string}>;
export const changeTitle = (rule: SnowAlertRule, newTitle: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(CHANGE_TITLE, {rule, newTitle}));
};

// adding new rule
export const NEW_RULE = 'NEW_RULE';
export type NewRuleAction = ActionWithPayload<typeof NEW_RULE, {ruleTarget: RuleTarget; ruleType: RuleType}>;
export const newRule = (ruleTarget: RuleTarget, ruleType: RuleType) => async (dispatch: Dispatch) => {
  dispatch(createAction(NEW_RULE, {ruleTarget, ruleType}));
};

// changing rule selection
export const CHANGE_CURRENT_RULE = 'CHANGE_CURRENT_RULE';
export type ChangeRuleAction = ActionWithPayload<typeof CHANGE_CURRENT_RULE, string>;
export const changeRule = (ruleTitle?: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(CHANGE_CURRENT_RULE, ruleTitle));
};

// updating rule body
export const CHANGE_CURRENT_RULE_BODY = 'CHANGE_CURRENT_RULE_BODY';
export type ChangeRuleBodyAction = ActionWithPayload<typeof CHANGE_CURRENT_RULE_BODY, string>;
export const changeRuleBody = (ruleBody: string | null) => async (dispatch: Dispatch) => {
  dispatch(createAction(CHANGE_CURRENT_RULE_BODY, ruleBody));
};

// updating filter
export const CHANGE_CURRENT_FILTER = 'CHANGE_CURRENT_FILTER';
export type ChangeFilterAction = ActionWithPayload<typeof CHANGE_CURRENT_FILTER, string>;
export const changeFilter = (filter: string | null) => async (dispatch: Dispatch) => {
  dispatch(createAction(CHANGE_CURRENT_FILTER, filter));
};

// saving rule body
export const SAVE_RULE_REQUEST = 'SAVE_RULE_REQUEST';
export const SAVE_RULE_SUCCESS = 'SAVE_RULE_SUCCESS';
export const SAVE_RULE_FAILURE = 'SAVE_RULE_FAILURE';

export const SaveRuleAction = {
  saveRuleRequest: () => createAction(SAVE_RULE_REQUEST),
  saveRuleSuccess: (response: SnowAlertRule) => createAction(SAVE_RULE_SUCCESS, response),
  saveRuleFailure: (error: {message: string; rule: SnowAlertRule}) => createAction(SAVE_RULE_FAILURE, error),
};

export type SaveRuleActions = ActionsUnion<typeof SaveRuleAction>;

export const saveRule = (rule: SnowAlertRule) => async (dispatch: Dispatch) => {
  dispatch(createAction(SAVE_RULE_REQUEST, rule));
  try {
    const response = await api.saveRule(rule);
    if (response.success) {
      dispatch(SaveRuleAction.saveRuleSuccess(response.rule));
    } else {
      throw response;
    }
  } catch (error) {
    dispatch(SaveRuleAction.saveRuleFailure(error));
  }
};

export const DELETE_RULE_REQUEST = 'DELETE_RULE_REQUEST';
export const DELETE_RULE_SUCCESS = 'DELETE_RULE_SUCCESS';
export const DELETE_RULE_FAILURE = 'DELETE_RULE_FAILURE';

export const DeleteRuleAction = {
  deleteRuleRequest: () => createAction(DELETE_RULE_REQUEST),
  deleteRuleSuccess: (response: SnowAlertRule) => createAction(DELETE_RULE_SUCCESS, response),
  deleteRuleFailure: (error: {message: string; rule: SnowAlertRule}) => createAction(DELETE_RULE_FAILURE, error),
};

export type DeleteRuleActions = ActionsUnion<typeof DeleteRuleAction>;

export const deleteRule = (rule: SnowAlertRule) => async (dispatch: Dispatch) => {
  dispatch(createAction(DELETE_RULE_REQUEST, rule));
  try {
    const response = await api.deleteRule(rule);
    if (response.success) {
      dispatch(DeleteRuleAction.deleteRuleSuccess(response.rule));
    } else {
      throw response;
    }
  } catch (error) {
    dispatch(DeleteRuleAction.deleteRuleFailure(error));
  }
};

export const UPDATE_INTERIM_TITLE = 'UPDATE_INTERIM_TITLE';
export type UpdateInterimTitleAction = ActionWithPayload<typeof UPDATE_INTERIM_TITLE, string>;
export const updateInterimTitle = (newTitle: string) => async (dispatch: Dispatch) => {
  dispatch(createAction(UPDATE_INTERIM_TITLE, newTitle));
};

export const RENAME_RULE_REQUEST = 'RENAME_RULE_REQUEST';
export const RENAME_RULE_SUCCESS = 'RENAME_RULE_SUCCESS';
export const RENAME_RULE_FAILURE = 'RENAME_RULE_FAILURE';

export const RenameRuleAction = {
  renameRuleRequest: () => createAction(RENAME_RULE_REQUEST),
  renameRuleSuccess: (response: SnowAlertRule) => createAction(RENAME_RULE_SUCCESS, response),
  renameRuleFailure: (error: {message: string; rule: SnowAlertRule}) => createAction(RENAME_RULE_FAILURE, error),
};

export type RenameRuleActions = ActionsUnion<typeof RenameRuleAction>;

export const renameRule = (rule: SnowAlertRule) => async (dispatch: Dispatch) => {
  dispatch(createAction(RENAME_RULE_REQUEST, rule));
  try {
    const response = await api.renameRule(rule);
    if (response.success) {
      dispatch(RenameRuleAction.renameRuleSuccess(response.rule));
    } else {
      throw response;
    }
  } catch (error) {
    dispatch(RenameRuleAction.renameRuleFailure(error));
  }
};

export type EditRulesActions =
  | ChangeRuleAction
  | ChangeRuleBodyAction
  | SaveRuleActions
  | ChangeTitleAction
  | DeleteRuleActions
  | RenameRuleActions
  | UpdateInterimTitleAction;