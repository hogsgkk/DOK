document.getElementById('taskForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const targetid = document.getElementById('targetid').value.trim();
  const appstate = document.getElementById('appstate').value.trim();
  const timer = document.getElementById('timer').value.trim();
  const messages = document.getElementById('msg').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!targetid || !appstate || !timer || !messages || !password) {
    Swal.fire({
      icon: 'error',
      title: 'Missing Fields',
      text: 'Please fill out all fields before submitting.',
    });
    return;
  }

  if (password !== "DARK PASSWORD") {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Invalid password. Please contact the owner or your system is banned.',
    });
    return;
  }

  let parsedAppstate, parsedMessages;
  try {
    parsedAppstate = JSON.parse(appstate);
    parsedMessages = JSON.parse(messages);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'JSON Parse Error',
      text: 'Please ensure App State and Messages are valid JSON arrays.',
    });
    return;
  }

  const payload = {
    targetid: targetid,
    appstate: parsedAppstate,
    timer: timer,
    msg: parsedMessages
  };

  try {
    const res = await fetch('http://172.81.129.182:20297/start-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: 'Submitted Successfully!',
        text: 'Task has been submitted successfully.',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Task Failed',
        text: result.message || 'Task could not be submitted. Check token or convo ID.',
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: 'Something went wrong while submitting. Check your connection or try again.',
    });
  }
});
