
var wshShell = new ActiveXObject("WScript.Shell");
var fso = new ActiveXObject("Scripting.FileSystemObject");
var dp0 = fso.GetParentFolderName(WScript.ScriptFullName);

var quotePath = function(path) {
	return "\"" + path + "\"";
}

var quotedAbsolutePath = function(relpath) {
	return quotePath(fso.BuildPath(dp0, relpath));
}

var shellArgs = " --login -i";
var minttyArgs = " --title \"Git Bash\"";

if (WScript.Arguments.Length > 0) {
	wshShell.CurrentDirectory = WScript.Arguments(0);
} else {
	wshShell.CurrentDirectory = wshShell.ExpandEnvironmentStrings("%USERPROFILE%");
}

var cmd = quotedAbsolutePath("bin\\mintty.exe") +
	minttyArgs +
	" --config " + wshShell.ExpandEnvironmentStrings("%USERPROFILE%") + "/.minttyrc" +
	" --icon " + quotedAbsolutePath("mintty\\gitmintty.ico") +
	" --exec " + quotedAbsolutePath("bin\\sh.exe") +
	shellArgs;

wshShell.Run(cmd, 1, false);
