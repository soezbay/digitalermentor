// Example code in your backend to handle push subscription
router.post('/subscribe', (req, res) => {
    const { pushSubscription } = req.body;
  
    // Store the push subscription details in the database
    savePushSubscriptionInDatabase(pushSubscription);
  
    res.status(201).json({ message: 'Push subscription saved successfully' });
  });
  