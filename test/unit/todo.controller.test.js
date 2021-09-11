/// <reference types="jest" />

const TodoController = require('../../controllers/todo.controller');
const TodoModel = require('../../model/todo.model');
const httpMocks = require('node-mocks-http');
const newTodo = require('../mock-data/new-todo.json');

//override the actual function, if not mocked, then we can't see if the function is being called
//it has to either be mocked or spied, if spy means still retain original implementation but can be spied on if it's being called
//mock does not call the original implementation but can still see if it's being called and can return predefined values
TodoModel.create = jest.fn();
let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('TodoController.createTodo', () => {
    beforeEach(() => {
        req.body = newTodo;
    });
    
    it('should have a createTodo function', () => {
        expect(typeof TodoController.createTodo).toBe('function');
    });
    it('should call TodoModel.create', () => {
        TodoController.createTodo(req, res, next);
        expect(TodoModel.create).toBeCalledWith(newTodo);
    });
    it('should return 201 response code', () => {
        TodoController.createTodo(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', () => {
        TodoModel.create.mockReturnValue(newTodo);
        TodoController.createTodo(req, res, next);
        expect(res._getData()).toBe(newTodo);
    });
});