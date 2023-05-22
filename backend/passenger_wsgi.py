import sys, os
cwd = os.getcwd()
sys.path.append(cwd)
 
INTERP = os.path.expanduser("~/python/bin/python3")
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)
    
from run import app as application