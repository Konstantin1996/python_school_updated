import sys
from executor import execute


BLOCKED_COMMANDS = ('open', 'write', 'read', 'import', 'subprocess', 'process', 'thread')

user_code = sys.argv[1]

for command in BLOCKED_COMMANDS:
	if command in user_code:
		sys.stderr.write('Error: unable execute following command: {}'.format(command))
		exit(1)

with open('file.py', 'w') as file:
    file.write(user_code)

execute("executor --timeout=0.01 --exclusive python3 file.py")
