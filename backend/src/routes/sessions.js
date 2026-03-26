const express = require('express');
const FocusSession = require('../models/FocusSession');
const Task = require('../models/Task');
const auth = require('../middlewares/auth');

const router = express.Router();

// Protect all session routes
router.use(auth);

// POST a new completed (or interrupted) session
router.post('/', async (req, res) => {
  try {
    const { taskId, duration, startTime, endTime, status } = req.body;
    
    const session = new FocusSession({
      userId: req.user,
      taskId: taskId || null,
      duration,
      startTime,
      endTime,
      status: status || 'COMPLETED'
    });

    await session.save();

    // If it's linked to a task and completed, we could increment focus count
    if (taskId && status === 'COMPLETED') {
      await Task.findByIdAndUpdate(taskId, { $inc: { completedFocusSessions: 1 } });
    }

    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET user stats (Tasks done, total focus time)
router.get('/stats', async (req, res) => {
  try {
    // 1. Calculate Tasks Done
    const tasksDoneCount = await Task.countDocuments({ userId: req.user, status: 'DONE' });

    // 2. Calculate Total Focus Minutes
    const sessions = await FocusSession.find({ userId: req.user, status: 'COMPLETED' });
    const totalFocusMinutes = sessions.reduce((acc, curr) => acc + curr.duration, 0);

    // 3. (Optional) Basic streak logic could be added here. For now, we mock streak or calculate based on unique days.
    const uniqueDays = new Set(sessions.map(s => s.startTime.toISOString().split('T')[0]));
    const currentStreak = uniqueDays.size;

    // 4. Calculate Weekly Data for Chart (last 7 days including today)
    const today = new Date();
    today.setHours(0,0,0,0);
    const weeklyData = Array.from({length: 7}, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      return { 
        name: d.toLocaleDateString('en-US', { weekday: 'short' }), 
        minutes: 0, 
        dateString: d.toISOString().split('T')[0] 
      };
    });

    sessions.forEach(s => {
      const sDate = s.startTime.toISOString().split('T')[0];
      const day = weeklyData.find(d => d.dateString === sDate);
      if (day) day.minutes += s.duration;
    });

    res.json({
      tasksDoneCount,
      totalFocusMinutes,
      currentStreak,
      weeklyData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
