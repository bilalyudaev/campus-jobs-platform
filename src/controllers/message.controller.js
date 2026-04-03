const prisma = require('../utils/prisma');
const t = require('../utils/i18n');

exports.sendMessage = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);
    const { messageText } = req.body;

    if (!messageText) {
      return res.status(400).json({ message: t(req.lang, 'message_text_required') });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true }
    });

    if (!application) {
      return res.status(404).json({ message: t(req.lang, 'application_not_found') });
    }

    const isStudent = application.studentId === req.user.userId;
    const isEmployer = application.job.employerId === req.user.userId;

    if (!isStudent && !isEmployer) {
      return res.status(403).json({ message: t(req.lang, 'forbidden') });
    }

    const receiverId = isStudent ? application.job.employerId : application.studentId;

    const message = await prisma.message.create({
      data: {
        applicationId,
        senderId: req.user.userId,
        receiverId,
        messageText
      }
    });

    res.status(201).json({
      message: t(req.lang, 'message_sent_successfully'),
      data: message
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_send_message') });
  }
};

exports.getMessagesByApplication = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true }
    });

    if (!application) {
      return res.status(404).json({ message: t(req.lang, 'application_not_found') });
    }

    const isStudent = application.studentId === req.user.userId;
    const isEmployer = application.job.employerId === req.user.userId;

    if (!isStudent && !isEmployer) {
      return res.status(403).json({ message: t(req.lang, 'forbidden') });
    }

    const messages = await prisma.message.findMany({
      where: { applicationId },
      orderBy: { createdAt: 'asc' }
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: t(req.lang, 'failed_to_fetch_messages') });
  }
};
