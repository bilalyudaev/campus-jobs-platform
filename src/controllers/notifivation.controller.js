const prisma = require('../utils/prisma');

exports.getMyNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json(
      notifications.map((item) => ({
        id: item.id,
        title: req.lang === 'es' ? item.titleEs : item.titleEn,
        message: req.lang === 'es' ? item.messageEs : item.messageEn,
        isRead: item.isRead,
        createdAt: item.createdAt
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = Number(req.params.id);

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId }
    });

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    if (notification.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
};

