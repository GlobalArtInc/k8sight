#!/bin/bash

if [[ $1 == "remove" ]]; then
	if type update-alternatives >/dev/null 2>&1; then
		update-alternatives --remove k8sight /usr/bin/k8sight
	else
		rm -f /usr/bin/k8sight
	fi
fi
