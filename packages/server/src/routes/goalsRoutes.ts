import * as goalsController from '../controllers/goals';

module.exports = app => {
  app.get('/api/goals', goalsController.getAllGoalsTransaction);
  app.post('/api/goals', goalsController.createGoalTransaction);
  app.delete('/api/goals/:did', goalsController.deleteGoal);
};
