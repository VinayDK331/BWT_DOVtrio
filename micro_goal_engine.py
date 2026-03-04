from datetime import datetime


def generate_micro_tasks(goal, deadline, days_per_week, hours_per_day):

    today = datetime.today()

    deadline_date = datetime.strptime(deadline, "%Y-%m-%d")

    total_days = (deadline_date - today).days

    if total_days <= 0:
        return []

    weeks = total_days / 7

    total_hours = weeks * days_per_week * hours_per_day

    total_minutes = total_hours * 60

    task_duration = 30

    number_of_tasks = int(total_minutes / task_duration)

    if number_of_tasks <= 0:
        number_of_tasks = 1

    tasks = []

    for i in range(number_of_tasks):

        task = {
            "title": f"{goal} - Step {i+1}",
            "duration": task_duration,
            "completed": False
        }

        tasks.append(task)

    return tasks