import sys
from executor import execute
from executor import ExternalCommand

BLOCKED_COMMANDS = ('open', 'write', 'read', 'import', 'subprocess', 'process', 'thread', 'exec', 'from', 'module')
TASK_ANSWERS = {
				'1': "HelloWorldPython!",
				'2': "100\n90\n80\n70\n60\n50\n40\n30\n20\n10\n",
				'3': "1\n3\n5\n7\n9\n"
				}
TASK_COMPLETED = "\n\nRight Answer!"
TASK_FAILED = "\n\nSomething is incorrect!\n\nRead the theory and instructions again and try to do your best!"


user_code = sys.argv[1]
task_number = user_code[-1:]
user_code = user_code[0:-1]

for command in BLOCKED_COMMANDS:
	if command in user_code:
		sys.stderr.write('Error: unable execute following command: {}'.format(command))
		exit(1)

with open('file.py', 'w') as file:
    file.write(user_code)


# Save the execution results of the user_code

def print_task_result(task, result):
	loop_check_for = "for"
	loop_check_while = "while"
	check_if = "if"
	if task == '1':
		status = TASK_ANSWERS['1'] == result
		print(TASK_COMPLETED) if status else print(TASK_FAILED)
	elif task == '2':
		status = (loop_check_for in user_code or loop_check_while in user_code) and result == TASK_ANSWERS['2']
		print(TASK_COMPLETED) if status else print(TASK_FAILED)
	elif task == '3':
		status = (loop_check_for in user_code and check_if in user_code) and result == TASK_ANSWERS['3']
		print(TASK_COMPLETED) if status else print(TASK_FAILED)


exec_result = execute("executor -q --timeout=0.01 --exclusive python3 file.py", capture=True)
print(exec_result)
print_task_result(task_number, exec_result)


# ANSWERS
# SECOND
# i = 100
# while i > 0:
#     print(i)
#     i -= 10
# for i in range(100,0,-10):
#     print(i)
